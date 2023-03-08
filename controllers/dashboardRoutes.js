const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all auth user's posts
router.get('/posts', withAuth, async (req, res) => {
    try {
        // now that user's been authenticated thanks to middleware specified above, let's get the current session's user id:
        const userId = req.session.userId;

        // let's find user id and incl all their posts
        const user = await User.findByPk(userId, {
            Include: [Post]
        });

        // Pass their posts to the view & render into all posts admin using dashboard layout:
        const posts = user.posts;
        res.render('allPostsAdmin', { posts });
        
    } catch (err) {
        // res.status(500).send('You do not have any posts! To create a post, go to LINK')
        console.log("This user does not have any active posts");
        // if user has no active posts, redirect to post creation page:
        res.redirect('/newPost');
    }
});

// Routes still needed:

// 2. get route with /new endpt, res.render for new post in the layout of dashboard

// 3. get route with the /edit/:id endpoint .. post.findByPk(req.params.id), then render into edit post with layout of dashboard