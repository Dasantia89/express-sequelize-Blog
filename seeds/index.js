const sequelize = require('../config/connection');
const seedPosts = require('./postData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedPosts();
  process.exit(0);
};

seedAll();
