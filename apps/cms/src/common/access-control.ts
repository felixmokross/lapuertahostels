import { Access, CollectionSlug, PayloadRequest } from "payload";

export function isAdmin(req: PayloadRequest) {
  return req.user?.role === "admin";
}

export function isEditor(req: PayloadRequest) {
  return req.user?.role === "editor";
}

export function isSelf(
  req: PayloadRequest,
  userId: string | number,
  authCollectionSlug: CollectionSlug,
) {
  return req.user?.id === userId && req.user?.collection === authCollectionSlug;
}

export function canManageContent({ req }: Parameters<Access>[0]) {
  return isAdmin(req) || isEditor(req);
}
