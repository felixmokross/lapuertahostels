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
