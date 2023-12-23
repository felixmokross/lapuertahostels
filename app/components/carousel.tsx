import { Fragment, useState } from "react";
import { cn } from "./classnames";
import { Image } from "./image";

export type CarouselProps = {
  items: CarouselItem[];
};

export type CarouselItem = {
  src: string;
  alt: string;
  title: CarouselItemTitle;
};

export type CarouselItemTitle = {
  text: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export function Carousel({ items }: CarouselProps) {
  if (items.length === 0) {
    throw new Error("Carousel must have at least one item");
  }

  const [itemIndex, setItemIndex] = useState(0);

  const item = items[itemIndex];
  return (
    <div className="relative h-[30rem] bg-puerta-100">
      <Fragment key={itemIndex}>
        <Image
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover"
        />
        {/* <div className="bg-black absolute top-0 h-full w-full opacity-20"></div> */}
        {item.title && (
          <h3
            className={cn(
              "absolute -translate-y-1/2 text-6xl font-light tracking-tighter text-white",
              {
                "left-8 top-1/3": item.title.position === "top-left",
                "right-8 top-1/3": item.title.position === "top-right",
                "bottom-1/3 left-8": item.title.position === "bottom-left",
                "bottom-1/3 right-8": item.title.position === "bottom-right",
              },
            )}
            style={{ textShadow: "0 0 50px black" }}
          >
            {item.title.text}
          </h3>
        )}
      </Fragment>
      <div className="absolute bottom-8 flex  w-full -translate-y-1/2 justify-center gap-4">
        {items.map((item, index) => (
          <button
            className="h-2 w-8 bg-neutral-200"
            key={index}
            onClick={() => setItemIndex(index)}
          >
            <span className="sr-only">{item.alt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
