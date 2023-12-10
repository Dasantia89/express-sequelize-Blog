const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
  if(!req.session.loggedIn){
    res.render('login')
    return;
  }
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
  if(!req.session.loggedIn){
    res.render('login')
    return;
  }
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

// delete a post
router.delete('/', async (req, res) => {
  if(!req.session.loggedIn){
    res.render('login')
    return;
  }
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

// Update a post
router.put('/', async (req, res) => {
  if(!req.session.loggedIn){
    res.render('login')
    return;
  }
  try {
    const dbUserData = await Post.update({ 
      title: req.body.title,
      content: req.body.content, 
    }, {
      where: {
        id: req.body.postId
      }
    });

    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;