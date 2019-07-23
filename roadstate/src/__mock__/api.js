
<<<<<<< HEAD
export const getBugReport = (response, apiCallback) => () => {
  apiCallback();
  return Promise.resolve(response);
};

export const getCurrentUser = async id => users.find(x => x.id === id);

export const postComment = async (id, comment, userId) => {
  try {
    bugReports.find(x => x.id === id).comments.push(comment);
    users.find(x => x.id === userId).comments.push(comment);
  } catch (error) {
    console.log(error);
  }
=======
export const callApiMock = (response, apiCallback) => () => {
  apiCallback();
  return new Promise((resolve) => {
    resolve(response);
  });
>>>>>>> 99cfb0f2e77954162247192dc8c183abc4779127
};
