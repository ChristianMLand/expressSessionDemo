const User = require('../models/user.model');

module.exports = {
    create: async (req, res) => {
        try {
            const user = await User.create(req.body);
            delete user.password;
            req.session.user = user;
            return res.json(user);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};