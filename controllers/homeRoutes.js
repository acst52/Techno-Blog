const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

// get all posts for homepage:
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
        include: [User]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('allPosts', {
      posts
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post by id /post/:id **

// login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup route - same as login, except /signup res.render(signup)

module.exports = router;
