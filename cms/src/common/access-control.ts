import { Access, PayloadRequest } from "payload/types";

export function isAdmin(req: PayloadRequest<any>) {
  return req.user.role === "admin";
}

export function isEditor(req: PayloadRequest<any>) {
  return req.user.role === "editor";
}

export function isFrontend(req: PayloadRequest<any>) {
  return req.user.role === "frontend";
}

export function isSelf(req: PayloadRequest<any>, userId: string | number) {
  return req.user.id === userId;
}

export function canManageContent({ req }: Parameters<Access>[0]) {
  return isAdmin(req) || isEditor(req);
}
