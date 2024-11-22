import { cn } from "../../lib/utils";

function Skeleton({
  className,
  show = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  show?: boolean;
}): JSX.Element {
  if (!show) return <>{props.children}</>;
  return (
    <span
      className={cn(
        "relative block h-6 animate-pulse rounded-md bg-neutral",
        props.children && "h-auto *:invisible",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
