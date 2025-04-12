export function transformRecord<K extends string, TSourceValue, TTargetValue>(
  record: Record<K, TSourceValue>,
  transform: (value: TSourceValue) => TTargetValue,
) {
  return Object.fromEntries(
    Object.entries<TSourceValue>(record).map(([key, value]) => [
      key,
      transform(value),
    ]),
  ) as Record<K, TTargetValue>;
}

export async function transformRecordAsync<
  K extends string,
  TSourceValue,
  TTargetValue,
>(
  record: Record<K, TSourceValue>,
  transform: (value: TSourceValue) => Promise<TTargetValue>,
) {
  return Object.fromEntries(
    await Promise.all(
      Object.entries<TSourceValue>(record).map(async ([key, value]) => [
        key,
        await transform(value),
      ]),
    ),
  ) as Record<K, TTargetValue>;
}

function isObject(obj: unknown) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
) {
  const output = structuredClone(target);
  for (const key in source) {
    if (isObject(source[key])) {
      if (!(key in output)) output[key] = {};
      output[key] = deepMerge(
        output[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>,
      );
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
