import Image from "next/image";

type Props = {};

const Event = (props: Props) => {
  return (
    <div>
      <Image
        src="/poster.jpeg"
        width={600}
        height={600}
        alt="PES Events logo"
        className="h-auto max-h-[500px] w-full bg-slate-50"
      />
    </div>
  );
};

export default Event;
