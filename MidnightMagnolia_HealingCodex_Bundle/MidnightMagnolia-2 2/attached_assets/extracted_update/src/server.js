import 'dotenv/config';
import express from 'express';
import path from 'path';
import url from 'url';
import fs from 'fs';
import { getDB } from './db.js';
import { sendMagicLink, setSessionCookie, clearSessionCookie, requireUser, requireAdmin } from './auth.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use('/static', express.static(path.join(__dirname, 'static')));

function render(res, view, vars = {}) {
  const layoutPath = path.join(__dirname, 'views', 'layout.html');
  const viewPath = path.join(__dirname, 'views', view);
  const base = fs.readFileSync(layoutPath, 'utf8');
  const page = fs.readFileSync(viewPath, 'utf8');
  res.set('Content-Type', 'text/html');
  res.send(base.replace('<!--CONTENT-->', page).replace('<!--TITLE-->', vars.title || 'Midnight Magnolia'));
}

// Public routes
app.get('/', (req, res) => render(res, 'index.html', { title: 'Midnight Magnolia' }));
app.get('/about', (req, res) => render(res, 'about.html', { title: 'About' }));

app.get('/shop', (req, res) => {
  render(res, 'shop.html', { title: 'Shop' });
});

app.get('/login', (req, res) => {
  render(res, 'login.html', { title: 'Login' });
});

app.post('/login', async (req, res) => {
  const { email } = req.body;
  const { error } = await sendMagicLink(email);
  if (error) return res.status(400).send(error.message);
  res.send('Magic link sent! Check your email.');
});

// Temporary callback to set cookie from posted tokens for MVP
app.post('/auth/callback', (req, res) => {
  setSessionCookie(res, req.body);
  res.redirect('/dashboard');
});

app.post('/logout', (req, res) => { clearSessionCookie(res); res.redirect('/'); });

// Protected dashboard
app.get('/dashboard', requireUser, (req, res) => {
  render(res, 'dashboard.html', { title: 'Dashboard' });
});

// API: products
app.get('/api/products', (req, res) => {
  const db = getDB();
  const rows = db.prepare("SELECT slug, title, description, price_cents FROM products WHERE status='published'").all();
  res.json(rows);
});

app.post('/api/products', requireUser, requireAdmin, (req, res) => {
  const db = getDB();
  const { slug, title, description, price_cents, status } = req.body;
  db.prepare(`
    INSERT OR REPLACE INTO products (id, slug, title, description, price_cents, status)
    VALUES (
      (SELECT id FROM products WHERE slug=@slug),
      @slug,@title,@description,@price_cents,@status
    )
  `).run({ slug, title, description, price_cents, status: status || 'draft' });
  res.json({ ok: true });
});

// Stripe checkout
app.post('/api/checkout', async (req, res) => {
  const { slug } = req.body;
  const db = getDB();
  const p = db.prepare("SELECT * FROM products WHERE slug=?").get(slug);
  if (!p) return res.status(404).json({ error: 'Not found' });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: p.title, description: p.description || '' },
        unit_amount: p.price_cents
      },
      quantity: 1
    }],
    success_url: `${process.env.BASE_URL}/shop?success=1`,
    cancel_url: `${process.env.BASE_URL}/shop?canceled=1`
  });

  res.json({ url: session.url });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Midnight Magnolia running on ${port}`));