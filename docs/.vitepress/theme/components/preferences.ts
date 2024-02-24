import { ref } from "vue";
import { AugmentedHeader } from "../../headerMdPlugin";

export const inBrowser = typeof window !== "undefined";
const get = (key: string, defaultValue = false): boolean =>
  inBrowser
    ? JSON.parse(localStorage.getItem(key) || String(defaultValue))
    : defaultValue;

export const preferSpringKey = "dolph-docs-prefer-spring";
export const preferSpring = ref(get(preferSpringKey, true));

export const preferExpressKey = "dolph-docs-prefer-express";
export const preferExpress = ref(get(preferExpressKey, true));

export function filterHeadersByPreference(h: AugmentedHeader) {
  return preferSpring.value ? !h.expressOnly : !h.springOnly;
}
