const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="your-button-styles">
      {children}
    </button>
  );
};

export default Button;
