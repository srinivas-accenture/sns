const isObject = (item: unknown): item is Record<string, unknown> =>
  Boolean(item && typeof item === 'object' && !Array.isArray(item))

const deepMerge = <T extends object, R extends object>(target: T, source: R): T & R => {
  const output = { ...target } as T & R

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject((source as any)[key])) {
        if (!(target as any)[key]) {
          Object.assign(output, { [key]: (source as any)[key] })
        } else {
          ;(output as any)[key] = deepMerge((target as any)[key], (source as any)[key])
        }
      } else {
        Object.assign(output, { [key]: (source as any)[key] })
      }
    })
  }

  return output
}

export default deepMerge
