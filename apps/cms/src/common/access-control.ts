import { Access, PayloadRequest } from "payload";

export function isAdmin(req: PayloadRequest) {
  return req.user?.role === "admin";
}

export function isEditor(req: PayloadRequest) {
  return req.user?.role === "editor";
}

export function isFrontend(req: PayloadRequest) {
  return req.user?.role === "frontend";
}

export function isSelf(req: PayloadRequest, userId: string | number) {
  return req.user?.id === userId;
}

export function canManageContent({ req }: Parameters<Access>[0]) {
  return isAdmin(req) || isEditor(req);
}
