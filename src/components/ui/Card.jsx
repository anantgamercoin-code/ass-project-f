import './Card.css';

function Card({
  title,
  value,
  subtitle,
  variant = 'default',
  size = 'default',
  children,
  className = '',
  ...props
}) {
  const cardClasses = [
    'card',
    variant && `card--${variant}`,
    size && `card--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      <div className="card__bg"></div>

      {(title || value || subtitle) && (
        <div className="card__header">
          {title && <span className="card__title">{title}</span>}
        </div>
      )}

      <div className="card__body">
        {value && <h2 className="card__value">{value}</h2>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export default Card;