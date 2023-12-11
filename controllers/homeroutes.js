const router = require('express').Router();
const { User, Post } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    const posts = postsData.map((post) =>
      post.get({ plain: true })
    );
    console.log(posts);
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.user,
      userName: req.session.name
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
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
