function convertBigIntToString<T>(obj: T | T[]): T | T[] {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => convertBigIntToString(item)) as T[];
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

  return newObj as T;
}

export default convertBigIntToString;
