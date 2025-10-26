import { useMemo, useState } from "react";

/**
 * React hook for managing an immutable class instance.
 * Updates state on method calls and supports chaining.
 */
export function useImmutableInstance<T extends object>(initialInstance: T): T {
  const [instance, setInstance] = useState<T>(initialInstance);

  const proxy = useMemo(() => {
    const createProxy = (target: T): T =>
      new Proxy(target, {
        get(current, prop, receiver) {
          const value = Reflect.get(current, prop, receiver);

          if (typeof value === "function") {
            return (...args: unknown[]) => {
              const method = value as (...args: unknown[]) => unknown;
              const result = method.apply(current, args);

              // If method returns new instance of same class → update state
              if (result instanceof current.constructor) {
                setInstance(result as T);
                return createProxy(result as T); // return a new proxy for chaining
              }

              return result;
            };
          }

          return value;
        },
      });

    return createProxy(instance);
  }, [instance]);

  return proxy;
}
