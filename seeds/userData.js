const { User } = require('../models');

const userData = [
  {
    username: 'ElonMusk',
    password: 'qwerty1!',
  },
  {
    username: 'DonaldTrump',
    password: 'qwerty1!',
  },
  {
    username: 'AndrewTate',
    password: 'qwerty1!',
  },
 
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
