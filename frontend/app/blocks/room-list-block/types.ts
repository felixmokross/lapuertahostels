import { Page } from "~/payload-types";

export type RoomListBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "RoomList";
};

export type Room = RoomListBlock["rooms"][number];
