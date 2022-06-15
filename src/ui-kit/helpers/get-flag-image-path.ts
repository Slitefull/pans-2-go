export const getFlagImagePath = (code: string) => {
  const pathToFlag = process.env.REACT_APP_LOCAL_ENV
    ? "/flags/"
    : "/flags/png250px/";

  return pathToFlag + code + ".png";
};
