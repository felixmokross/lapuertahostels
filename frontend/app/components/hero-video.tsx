export type HeroVideoProps = {
  src: string;
};

export function HeroVideo({ src }: HeroVideoProps) {
  return (
    <div className="h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      ></video>
    </div>
  );
}
