export function Select({
  options,
  onSelect,
  label,
  className,
}: {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  label: string;
  className?: string;
}): JSX.Element {
  return (
    <div className={`${className} space-y-2`}>
      <label htmlFor={label} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={label}
        className="w-full outline-none p-1 border rounded-md font-medium"
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {options.map((x, idx) => {
          return (
              <option value={x.value} key={idx}>
                {x.label}
              </option>
          );
        })}
      </select>
    </div>
  );
}
