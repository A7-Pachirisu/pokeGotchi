interface InputProps {
  label: string;
}

function Input({ label }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input type="text" className="rounded px-4 py-2.5" />
    </div>
  );
}

export default Input;
