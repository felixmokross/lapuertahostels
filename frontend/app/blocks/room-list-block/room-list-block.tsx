import { RoomCard, RoomCardProps } from "./room-card";

export type RoomListBlockProps = {
  roomCards: RoomCardProps[];
};

export function RoomListBlock({ roomCards }: RoomListBlockProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-32">
      {roomCards.map((rc, index) => (
        <RoomCard key={index} {...rc} />
      ))}
    </div>
  );
}
