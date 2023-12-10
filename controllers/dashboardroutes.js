const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  try {

    const postsData = await Post.findAll({
      where: {
        user_id: req.session.user
      },
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
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      user_id: req.session.user
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// CREATE new post
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      created: req.body.time,
      user_id: req.body.id
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    const dbUserData = await Post.destroy({
      where: {
        id: req.body.id
      }
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;