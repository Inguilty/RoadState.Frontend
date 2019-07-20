import { bugReports, users } from './mockData';

export const getBugReport = async id => bugReports.find(x => x.id === id);

export const getCurrentUser = async id => users.find(x => x.id === id);

export const postComment = async (id, comment, userId) => {
  try {
    bugReports.find(x => x.id === id).comments.push(comment);
    users.find(x => x.id === userId).comments.push(comment);
  } catch (error) {
    console.log(error);
  }
};

export const createBugReport = createBR => new Promise((resolve) => {
  console.log(createBR);
  setTimeout(() => {
    resolve({
      status: 200,
    });
  }, 2000);
});
