import { cn } from "@/lib/utils";
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "container mx-auto max-w-7xl px-4 md:px-8 py-4 w-full",
        className
      )}
    >
      {children}
    </div>
  );
};
export default Container;
