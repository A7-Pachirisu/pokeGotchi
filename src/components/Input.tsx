interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={label}>{label}</label>}
      <input id={label} className="rounded px-4 py-2.5" {...props} />
    </div>
  );
}

export default Input;
