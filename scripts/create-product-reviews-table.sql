-- Create product reviews table for Midnight Magnolia
-- This table stores customer reviews and ratings for products

-- First, create the products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    category VARCHAR(100),
    tags TEXT[],
    image_url VARCHAR(500),
    gallery_images TEXT[],
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL, -- Could be Shopify product ID or internal product SKU
    user_id VARCHAR(255), -- If users are authenticated and submitting reviews
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_email VARCHAR(255), -- Optional, consider privacy
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    body TEXT NOT NULL,
    images JSONB, -- Array of image URLs if reviews can include images
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, flagged
    helpful_votes INTEGER DEFAULT 0,
    not_helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id_status ON product_reviews (product_id, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON product_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_reviews_approved ON product_reviews(status);

-- Create review helpfulness tracking table
CREATE TABLE IF NOT EXISTS review_helpfulness (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES product_reviews(id) ON DELETE CASCADE,
    UNIQUE(review_id, customer_email)
);

-- Insert sample products for testing
INSERT INTO products (name, slug, description, price, sale_price, category, tags, image_url, stock_quantity) VALUES
('Sacred Moon Journal', 'sacred-moon-journal', 'A beautifully crafted journal for your spiritual journey and moon cycle tracking.', 47.00, 37.00, 'Journals', ARRAY['spiritual', 'moon', 'journaling'], '/healing-journal-cover.png', 25),
('Midnight Magnolia Mug', 'midnight-magnolia-mug', 'Start your morning ritual with this elegant ceramic mug featuring our signature magnolia design.', 28.00, NULL, 'Drinkware', ARRAY['ceramic', 'morning ritual', 'magnolia'], '/midnight-moon-mug.png', 15),
('Healing Herbs Tote', 'healing-herbs-tote', 'Carry your sacred tools and daily essentials in this sturdy canvas tote bag.', 35.00, 29.00, 'Accessories', ARRAY['canvas', 'tote', 'herbs'], '/magnolia-tote-bag.png', 30),
('Southern Gothic Pillow', 'southern-gothic-pillow', 'Transform your sacred space with this luxurious velvet pillow featuring mystical Southern Gothic design.', 65.00, NULL, 'Home Decor', ARRAY['velvet', 'pillow', 'gothic'], '/southern-gothic-pillow.png', 12),
('Elegant Moon Mug', 'elegant-moon-mug', 'Sip your evening tea under the moon''s guidance with this celestial ceramic mug.', 32.00, 25.00, 'Drinkware', ARRAY['ceramic', 'moon', 'evening ritual'], '/elegant-moon-magnolia-mug.png', 20);

-- Insert sample reviews for testing
INSERT INTO product_reviews (product_id, reviewer_name, reviewer_email, rating, title, body, is_verified_purchase) VALUES
(1, 'Sarah M.', 'sarah.m@example.com', 5, 'Perfect for my spiritual practice', 'This journal has become an essential part of my daily ritual. The quality is exceptional and the pages feel sacred to write on.', true),
(1, 'Luna W.', 'luna.w@example.com', 5, 'Beautiful and meaningful', 'I love tracking my moon cycles in this journal. The design is gorgeous and it feels so special to use.', true),
(1, 'Maya R.', 'maya.r@example.com', 4, 'Great quality, love the design', 'Really well-made journal with beautiful paper. Only wish it was a bit larger, but overall very happy with my purchase.', true),
(2, 'Jessica T.', 'jessica.t@example.com', 5, 'My new favorite mug', 'This mug makes my morning coffee feel like a ritual. The design is stunning and it holds the perfect amount.', true),
(2, 'Amber K.', 'amber.k@example.com', 5, 'Absolutely love it!', 'The quality exceeded my expectations. It''s become my go-to mug for my morning meditation tea.', true),
(3, 'Rachel D.', 'rachel.d@example.com', 4, 'Sturdy and beautiful', 'Great tote bag for carrying my crystals and books. The design is subtle but meaningful.', true),
(4, 'Morgan L.', 'morgan.l@example.com', 5, 'Transforms my space', 'This pillow adds such a mystical energy to my meditation corner. The velvet is so soft and luxurious.', true),
(5, 'Sage B.', 'sage.b@example.com', 5, 'Perfect for evening rituals', 'I use this mug every night for my bedtime tea. The moon design is so calming and beautiful.', true);

-- Update helpful counts for some reviews
UPDATE product_reviews SET helpful_votes = 8 WHERE id = 1;
UPDATE product_reviews SET helpful_votes = 6 WHERE id = 2;
UPDATE product_reviews SET helpful_votes = 4 WHERE id = 3;
UPDATE product_reviews SET helpful_votes = 7 WHERE id = 4;
UPDATE product_reviews SET helpful_votes = 5 WHERE id = 5;

-- Create a view for product review statistics
CREATE OR REPLACE VIEW product_review_stats AS
SELECT 
    p.id as product_id,
    p.name as product_name,
    COUNT(pr.id) as total_reviews,
    ROUND(AVG(pr.rating), 2) as average_rating,
    COUNT(CASE WHEN pr.rating = 5 THEN 1 END) as five_star_count,
    COUNT(CASE WHEN pr.rating = 4 THEN 1 END) as four_star_count,
    COUNT(CASE WHEN pr.rating = 3 THEN 1 END) as three_star_count,
    COUNT(CASE WHEN pr.rating = 2 THEN 1 END) as two_star_count,
    COUNT(CASE WHEN pr.rating = 1 THEN 1 END) as one_star_count
FROM products p
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.status = 'approved'
GROUP BY p.id, p.name;

-- Create function to update product rating cache
CREATE OR REPLACE FUNCTION update_product_rating_cache()
RETURNS TRIGGER AS $$
BEGIN
    -- This function can be used to update cached rating data
    -- when reviews are added, updated, or deleted
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic rating updates
CREATE TRIGGER update_product_rating_on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON product_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_product_rating_cache();

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON products TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON product_reviews TO your_app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON review_helpfulness TO your_app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

-- Display summary of created tables
SELECT 'Products table created with ' || COUNT(*) || ' sample products' as summary FROM products
UNION ALL
SELECT 'Product reviews table created with ' || COUNT(*) || ' sample reviews' as summary FROM product_reviews;
