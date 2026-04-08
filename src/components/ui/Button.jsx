import './Button.css';

function Button({
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  icon,
  className = '',
  ...props
}) {
  const buttonClasses = [
    'btn',
    variant && `btn--${variant}`,
    size && `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;