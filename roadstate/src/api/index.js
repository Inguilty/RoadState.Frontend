import axios from 'axios';

const BASE_URL = '';

export const loginUser = () => axios.post(`${BASE_URL}/login`);

export const loadBugReport = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: [
        {
          id: 1,
          description: 'Fucking road has not been repairing for 20 years, see this fucking bullshit!',
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
