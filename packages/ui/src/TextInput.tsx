export function TextInput({
  label,
  placeholder,
  onChange,
  className,
}: {
  label: string;
  placeholder: string;
  className?:string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={label} className="text-sm font-medium">{label}</label>
      <input
        type="number"
        className="w-full p-1 px-2 rounded-md font-medium placeholder:text-sm placeholder:font-medium outline-none border"
        placeholder={placeholder}
        id={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
