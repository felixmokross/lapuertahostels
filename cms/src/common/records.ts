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
