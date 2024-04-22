import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      className="h-[75px] w-auto bg-slate-50"
      height={110}
      width={130}
      alt="PES Events logo"
      src="/events-logo.png"
    />
  );
};
