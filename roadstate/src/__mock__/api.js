import { bugReports, users } from './mockData';

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
};
