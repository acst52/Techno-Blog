const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// import withAuth middleware
const withAuth = require('../utils/auth');

class Post extends Model {
    // make sure user logged in to create post
    static createPost(postData, userId) {
        return withAuth(async (req, res) => {
            try { // if logged in,
                if (req.session.user.id !== userId) {
                    return res.status(401).json({ error: 'You are not authorized to create this post' });
                }
                // then create the post
                const post = await Post.create(postData);
                return post;
            } catch (err) { // else throw err
                console.log(err);
            }
        });
    }
    // make sure user logged in to delete post
    static deletePost(postId, userId) {
        return withAuth(async (req, res) => {
            try {
                const post = await Post.findByPk(postId);
                // if 1. post is bad (like null, undefined etc) OR if 2. post ID exists BUT DOES NOT match creator/user ID, then return error
                if (!post || post.userId !== userId) {
                    return res.status(401).json({ error: 'You are not authorized to delete this post' });
                }
                // else, if post ID exists and was created by the current user with user ID, delete the post
                await post.destroy();
                return true;
            } catch (err) {
                console.error(err);
            }
        });
    }
}

Post.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            // beforeCreate: make sure user is logged in? or put this in helper fcn and call above??
        }
    }, {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
});

module.exports = Post;