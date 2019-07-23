import axios from 'axios';

const BASE_URL = '';

export const loadBugReport = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: [
        {
          id: 1,
          description:
              'Fucking road has not been repairing for 20 years, see this fucking bullshit!',
          photos: [],
          location: {
            longtitude: 36.0,
            latitude: 50.0,
          },
          state: 'Very low',
          rating: 1.0,
          comments: [],
          userRate: 'agree',
        },
        {
          id: 2,
          description: 'Pretty good road!',
          photos: [],
          location: {
            longtitude: 36.0,
            latitude: 50.0,
          },
          state: 'Very high',
          rating: 10.0,
          comments: [],
        },
      ].find(x => x.id === id),
    });
  }, 2000);
});

export const rateBugReport = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

export const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/logout`);
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

export const login = (userName, password) => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/authenticate`, userName);
    resolve({
      status: 200,
      data: {
        id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
        token: 'fake-jwt-token',
        errorMessage: '',
      },
    });
  }, 2000);
});

export const register = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/register`, user);
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

export const update = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.put(`${config.apiUrl}/users/${user.id}`, user);
    resolve({
      status: 200,
      data: {
        id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
        token: 'fake-jwt-token',
        errorMessage: '',
      },
    });
  }, 2000);
});
