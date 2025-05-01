import Image from "next/image";
import { LazyRender } from "@galiprandi/react-tools";
import { CSSProperties } from "react";

export default function UserAvatar({
  src,
  alt,
  size = 55,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <LazyRender placeholder={<Skeleton size={size} />}>
      <Image src={src} alt={alt} width={size} height={size} style={styles} />
    </LazyRender>
  );
}

const Skeleton = ({ size = 55 }: { size?: number }) => {
  return <div style={{ ...styles, width: size, height: size }} />;
};

const styles: CSSProperties = {
  borderRadius: "50%",
};
