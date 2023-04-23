export function stripLongString(str: string) {
  const maxLength = 40;
  const ellipsis = "...";

  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }
}
