export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToOmit: K[] | any[],
): Pick<T, Exclude<keyof T, K>> {
  const result = { ...object }

  for (const key of keysToOmit)
    delete result[key]

  return result
}
