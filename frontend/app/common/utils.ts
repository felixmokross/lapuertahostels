import { MutableRefObject, RefCallback } from "react";

type AcceptedRef<T> = MutableRefObject<T | null> | RefCallback<T> | null;

export function mergeRefs<T>(...refs: AcceptedRef<T>[]): RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null) {
        ref.current = value;
      }
    }
  };
}

export function isObject<T>(obj: T | string | undefined | null): obj is T {
  return !!obj && typeof obj === "object";
}

export function gracefully<T, K extends keyof T>(
  obj: T | string | undefined | null,
  key: K,
): T[K] | undefined {
  return isObject(obj) ? obj[key] : undefined;
}
