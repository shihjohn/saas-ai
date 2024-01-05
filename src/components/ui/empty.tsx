import Image from "next/image";

interface EmptyProps {
  label: string;
}
export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative w-24 h-8 mb-2">
        <Image fill alt="logo" src="/logo.png" />
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
