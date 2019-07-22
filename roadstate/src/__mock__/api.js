import { users } from './mockData';

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

export const getCurrentUser = async id => users.find(x => x.id === id);

export const postComment = async (id, comment, userId) => {
  try {
    users.find(x => x.id === userId).comments.push(comment);
  } catch (error) {
    console.log(error);
  }
};
