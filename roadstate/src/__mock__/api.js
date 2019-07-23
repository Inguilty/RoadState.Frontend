
export const callApiMock = (response, apiCallback) => () => {
  apiCallback();
  return new Promise((resolve) => {
    resolve(response);
  });
};

export const createBugReport = createBR => new Promise((resolve) => {
  console.log(createBR);
  setTimeout(() => {
    resolve({
      status: 200,
    });
  }, 2000);
});
