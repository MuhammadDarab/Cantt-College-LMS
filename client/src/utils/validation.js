export function checkPropertiesNotNull(obj) {
  for (const key in obj) {
    debugger;
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] === null || obj[key] === "")
    ) {
      return false;
    }
  }
  return true;
}
