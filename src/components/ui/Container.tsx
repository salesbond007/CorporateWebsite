import { cn } from "@/lib/cn";

type Props = React.PropsWithChildren<{
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}>;

export function Container({ children, className, as: Tag = "div" }: Props) {
  return (
    <Tag className={cn("container", className)}>
      {children}
    </Tag>
  );
}
