export function hashCode(str: string): string {
  return str
    .split("")
    .reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0)
    .toString()
}
