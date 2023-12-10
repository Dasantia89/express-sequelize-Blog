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
        loggedIn : req.session.loggedIn,
        name : req.session.name
      })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  });







module.exports = router;