const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all auth user's posts
router.get('/', withAuth, async (req, res) => {
    try {
        // let's find user id and incl all their posts
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });

        // Pass their posts to the view & render into all posts admin using dashboard layout:
        const posts = postData.map((post) => post.get({
            plain: true
        }));
        res.render('allPostsAdmin', { layout: "dashboard", posts });
        
    } catch (err) { // if withAuth fails...
        // if user has no active posts, redirect to login page:
        res.redirect('login');
    }
});


// Routes still needed:

// 2. get route with /new endpt, res.render for new post in layout of dashboard

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('newPost', { layout: 'dashboard' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. get route with the /edit/:id endpoint .. post.findByPk(req.params.id), then render into edit post with layout of dashboard

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({
                plain: true
            });
            res.render('editPost', { layout: 'dashboard', post });
        } else {
            res.status(404).end(); // if bad req / id not found
        }
    } catch (err) {
        res.redirect('login'); // if withAuth fails
    }
});

module.exports = router;