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
