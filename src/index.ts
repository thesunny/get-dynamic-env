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
  processEnv: Record<string, string | undefined>,
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
