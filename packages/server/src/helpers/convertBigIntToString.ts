function convertBigIntToString(obj: Record<string, any>): Record<string, any> {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }

  const newObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'bigint') {
      newObj[key] = value.toString();
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = convertBigIntToString(value);
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
}

export default convertBigIntToString;
