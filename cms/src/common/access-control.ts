import { PayloadRequest } from "payload/types";

export function isAdmin(req: PayloadRequest<any>) {
  return req.user.role === "admin";
}

export function isSelf(req: PayloadRequest<any>, userId: string | number) {
  return req.user.id === userId;
}
