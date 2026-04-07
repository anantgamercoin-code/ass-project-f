import "../../styles/components/card.css";

function Card({ title, value, subtitle, variant = "default" }) {
  return (
    <div className={`card card--${variant}`}>
      <div className="card__bg"></div>

      <div className="card__header">
        <span className="card__title">{title}</span>
      </div>

      <div className="card__body">
        <h2 className="card__value">{value}</h2>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default Card;
