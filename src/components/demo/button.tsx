interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button className="rounded-lg border bg-gray-100 px-3 py-2" {...rest}>
      {children}
    </button>
  );
};

export default Button;
