import React from 'react';

interface ServiceCardProps {
  service: {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    offerings: string[];
  };
  isActive: boolean;
  onHover: (id: string | null) => void;
  onContact: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  isActive, 
  onHover, 
  onContact 
}) => {
  return (
    <article 
      className={`service-offering ${isActive ? 'active' : ''}`}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="icon-vessel">
        <span className="service-icon">{service.icon}</span>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-subtitle">{service.subtitle}</p>
      <p className="service-description">{service.description}</p>
      <ul className="service-seeds">
        {service.offerings.map((offering, index) => (
          <li key={index}>{offering}</li>
        ))}
      </ul>
      <button 
        className="gentle-cta"
        onClick={onContact}
      >
        Plant this seed →
      </button>
    </article>
  );
};

export default ServiceCard;