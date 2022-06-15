export function mockCustom(
  datObj: object,
  responseType: "success" | "error" = "success",
  time: number = 500
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (responseType === "success") {
        resolve(datObj);
      } else {
        resolve({ error: "error" });
      }
    }, time);
  });
}
