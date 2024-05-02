import Image from "next/image";

type Props = {
  imageUrl: string;
  altText: string;
};

const Event = ({ imageUrl, altText }: Props) => {
  return (
    <div>
      <Image
        src={imageUrl}
        width={600}
        height={600}
        alt={altText}
        className="h-auto max-h-[500px] w-full bg-slate-50"
      />
    </div>
  );
};

export default Event;
