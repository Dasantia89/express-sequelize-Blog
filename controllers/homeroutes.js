const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          required: false,
          include: [{model: User, attributes: ['username']}]
        }
      ],
    });

    const posts = postsData.map((post) =>
      post.get({ plain: true })
    );
    console.log(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      user_Id: req.session.userId,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// CREATE new post
router.post('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login')
    return;
  }
  try {
    const dbUserData = await Comment.create({
      content: req.body.content,
      created: req.body.time,
      user_id: req.body.userId,
      post_id: req.body.postId
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
