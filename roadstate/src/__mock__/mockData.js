export const bugReports = [
  {
    id: 1,
    description:
      'Fucking road has not been repairing for 20 years, see this fucking bullshit!',
    photos: [
      'https://podrobnosti.mk.ua/storage/cache/2016-03/2a000c8856ea62ab4cc6e.jpg?w=720&s=e244302db4d340327494b6d3951b0c6c',
      'http://zona-dtp.ru/uploads/posts/2012-12/1355845354_open-uri20110920-25868-1tm83wf.jpg'
    ],
    location: {
      longtitude: 36.0,
      latitude: 50.0
    },
    state: 'Very low',
    rating: 1.0,
    comments: []
  },
  {
    id: 2,
    description: 'Pretty good road!',
    photos: [],
    location: {
      longtitude: 36.0,
      latitude: 50.0
    },
    state: 'Very high',
    rating: 10.0,
    comments: []
  }
];

export const users = [
  {
    id: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
    userName: 'Just a visitor',
    defaultLocation: {
      latitude: 36.1,
      longtitude: 50.0
    },
    registrationDate: new Date().toISOString(),
    pollList: [],
    likeList: []
  },
  {
    id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
    userName: 'City council',
    defaultLocation: [],
    registrationDate: new Date().toISOString(),
    pollList: [],
    likeList: []
  }
];
