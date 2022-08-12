import { DependencyList, useEffect } from "react";

export function useAsyncEffect<T>(
  effect: () => Promise<T>,
  deps?: DependencyList
) {
  return useEffect(() => {
    (async () => {
      try {
        return await effect();
      } catch (e) {
        console.warn(e);
      }
    })();
  }, deps);
}

export async function runCatchingAsync<T>(block: () => Promise<T>): Promise<T> {
  try {
    return await block();
  } catch (e) {
    console.warn(e);
  }
}
