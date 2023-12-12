const User = require('../models/user.model');

module.exports = {
    getLoggedUser: (req, res) => res.json(req.session.user),
    login: async (req, res) => {
        try {
            const user = await User.checkLogin(req.body);
            delete user.password;
            req.session.user = user;
            return res.json(user);
        } catch (error) {
            return res.status(401).json(error);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.json({ message: "success"});
    }
};