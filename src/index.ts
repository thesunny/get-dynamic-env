type MapToEnv<T> = {
  [K in keyof T]: string
}

/**
 * WARNING!
 * IMPORTANT!
 *
 * Do not use `process.env[key]` or something DYNAMIC way to get the value.
 *
 * The var must EXPLICITLY spell out `process.env.VAR_NAME`.
 */
export function getServerEnv<T extends { [key: string]: string | undefined }>(
  map: T
): MapToEnv<T> {
  const env = {} as MapToEnv<T>
  for (const key in map) {
    const value = map[key]
    if (typeof value !== "string") {
      throw new Error(
        `The key on passed in object ${key} must be a string but is ${value}`
      )
    }
    env[key] = value.trim()
  }
  return env
}

/**
 * WARNING!
 * IMPORTANT!
 *
 * The values must EXPLICITLY spell out `process.env.VAR_NAME`
 *
 * Do not use `process.env[key]` or something DYNAMIC way to get the value.
 *
 * On the client, we make sure that all vars start with `NEXT_PUBLIC` as well.
 */
export function getClientEnv<T extends { [key: string]: string | undefined }>(
  map: T
): MapToEnv<T> {
  const env = {} as MapToEnv<T>
  for (const key in map) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
      throw new Error(
        `The key ${JSON.stringify(
          key
        )} does not begin with "NEXT_PUBLIC" but should on the client`
      )
    }
    const value = map[key]
    if (typeof value !== "string") {
      throw new Error(
        `The key on passed in object ${key} must be a string but is ${value}`
      )
    }
    env[key] = value.trim()
  }
  return env
}

/**
 * IMPORTANT: Do not use with Next.js
 *
 * This only works when the environment variables haven't been hard replaced
 * with constants like in `Next.js`.
 *
 * There must be an actual `process.env` object because that object will be
 * passed in as the first argument.
 *
 * So code like...
 *
 * ```
 * console.log(process.env.NAME)
 * ```
 *
 * will be recompiled to
 *
 * ```
 * console.log("Some name")
 * ```
 *
 * and that won't work.
 *
 * The value `process.env` either won't exist or be an empty object.
 */
export function getDynamicEnv<T extends string>(
  processEnv: Record<string, string>,
  envNames: T[]
): Record<T, string> {
  const env: Record<T, string> = {} as Record<T, string>
  for (const key of envNames) {
    const value = processEnv[key]
    if (typeof value !== "string") {
      throw new Error(
        `Expected processEnv (passed in) to have "${key}" to be defined but it is not`
      )
    }
    env[key] = value
  }
  return env
}
