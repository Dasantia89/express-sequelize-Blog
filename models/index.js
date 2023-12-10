const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  // A book belongs to a single reader
  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  // A book belongs to a single reader
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });
  
  // A book belongs to a single reader
  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
  });

module.exports = { User, Post, Comment };
