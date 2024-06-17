import { RoomCard } from "./room-card";
import { type RoomListBlock } from "./types";

export type RoomListBlockProps = RoomListBlock;

export function RoomListBlock({ rooms, ctaTemplate }: RoomListBlockProps) {
  return (
    <div className="mx-auto my-36 flex flex-row flex-wrap justify-center gap-32">
      {rooms.map((room) => (
        <RoomCard key={room.id} {...room} ctaTemplate={ctaTemplate} />
      ))}
    </div>
  );
}
