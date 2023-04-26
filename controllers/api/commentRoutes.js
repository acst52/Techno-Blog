// 
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create new comment
router.post('/', withAuth, async (req, res) => {
    try {
        console.log('Received comment request:', req.body);
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId // not sure if this needs to be userId or user_id??
        });
        console.log(newComment);
        res.json(newComment)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;