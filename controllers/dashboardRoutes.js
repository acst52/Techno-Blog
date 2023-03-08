const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// routes needed: 1. get route to get all the logged in user's posts ... post.findAll, include where property inside obj wherE userId: req.session.userId. Route same as the home route to get all posts for homepage. render into all posts admin using dashboard layout
// 2. get route with /new endpt, res.render for new post in the layout of dashboard
// 3. get route with the /edit/:id endpoint .. post.findByPk(req.params.id), then render into edit post with layout of dashboard