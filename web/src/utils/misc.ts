// Will return whether the current environment is in a regular browser

import { assetspath } from '../store/assetsPath';

// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// Basic no operation function
export const noop = () => {};

export const getItemUrl = (name: string) => {
  return `${assetspath}/${name}.png`;
};
