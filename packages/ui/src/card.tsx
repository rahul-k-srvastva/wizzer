export function Card({
  title,
  children,
  className
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={`p-4 rounded-lg shadow-md border ${className}`}>
      <h2 className="text-xl border-b pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
