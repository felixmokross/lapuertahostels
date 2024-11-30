import { useLoaderData } from "@remix-run/react";

export type SerializeFromLoader<T> = ReturnType<typeof useLoaderData<T>>;
