const { Post } = require('../models');

const postData = [
  {
    title: 'First post',
    content: 'First post content',
    created: 'April 20, 2021 07:00:00',
    user_id: 1,
  },
  {
    title: 'Second post',
    content: 'Second post content',
    created: 'April 23, 2021 07:00:00',
    user_id: 2,
  },
  {
    title: 'Third post',
    content: 'Third post content',
    created: 'April 1, 2021 07:00:00',
    user_id: 3,
  },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
