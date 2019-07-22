
export const loadBugReport = (response, apiCallback) => () => {
  apiCallback();
  return new Promise((resolve) => {
    resolve(response);
  });
};

export const rateBugReport = (response, apiCallBack) => () => {
  apiCallBack();
  return new Promise((resolve) => {
    resolve(response);
  });
};
