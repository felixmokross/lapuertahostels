import { Page } from "@lapuertahostels/shared";

export type RoomListBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "RoomList";
};

export type Room = RoomListBlock["rooms"][number];
