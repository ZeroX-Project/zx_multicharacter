export let assetspath = 'assets';

export function setAssetsPath(path: string) {
  if (path && path !== '') assetspath = path;
}
