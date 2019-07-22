
export const callApiMock = (response, apiCallback) => () => {
  apiCallback();
  return new Promise((resolve) => {
    resolve(response);
  });
};
