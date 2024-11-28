import { NewPage } from "~/payload-types";

export type RoomListBlock = NonNullable<NewPage["layout"]>[number] & {
  blockType: "RoomList";
};

export type Room = RoomListBlock["rooms"][number];
