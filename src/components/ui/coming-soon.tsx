import Image from "next/image";

export const Coming = () => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 mb-2">
        <Image fill alt="logo" src="/coming-soon.png" />
      </div>
    </div>
  );
};
