import axios from 'axios';

const BASE_URL = '/';

export const loadBugReport = id => axios.get(`${BASE_URL}api/bugreport/${id}`);

export const rateBugReport = (id, rate) => axios.post(`${BASE_URL}api/bugreport/${id}/rate`, rate);

export const createBugReport = (createBR) => {
  /* const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }; */
  // return axios.post(`${BASE_URL}api/createbugreport`, createBR, config);
  const data = {
    ProblemLevel: createBR.problemLevel,
    Description: createBR.description,
    Longitude: createBR.longitude,
    Latitude: createBR.latitude,
  };
  debugger;
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json',
  });
  const fd = new FormData();
  // fd.append('ProblemLevel', createBR.problemLevel);
  // fd.append('Description', createBR.description);
  // fd.append('Longitude', createBR.longitude);
  // fd.append('Latitude', createBR.latitude);
  //  fd.append('Photos', createBR.photos);
  fd.append('Data', blob);
  for (let i = 0; i < createBR.photos.length; i += 1) {
    const file = createBR.photos.item(i);
    fd.append(`Photos[${i}]`, file, file.name);
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
      console.log(percentCompleted);
    }
  };
  return axios.post(`${BASE_URL}api/createbugreport`, fd, config)
    .then(responce => console.log(responce))
    .catch(responce => console.log(responce));
};
