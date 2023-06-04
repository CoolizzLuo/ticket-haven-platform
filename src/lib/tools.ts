export const objectToUrlSearchParams = (obj: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries<string>(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => params.append(key, val.toString()));
    } else {
      params.append(key, value.toString());
    }
  });
  return params;
};
