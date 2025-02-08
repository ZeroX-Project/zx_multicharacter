import { assetspath } from '../store/assetsPath';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

export const noop = () => {};

export const getItemUrl = (name: string) => {
  return `${assetspath}/${name}.png`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
