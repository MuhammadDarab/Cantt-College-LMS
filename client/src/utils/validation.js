export function checkPropertiesNotNull(obj) {
  debugger;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (!checkPropertiesNotNull(obj[key])) {
          return false;
        }
      } else if (obj[key] === null || obj[key] === "") {
        return false;
      }
    }
  }
  return true;
}
