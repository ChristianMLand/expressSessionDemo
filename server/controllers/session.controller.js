import User from "../models/user.model.js";

const getLoggedUser = async (req, res) => {
    try {
        const { _id, username } = await User.findById(req.session.userId);
        return res.json({ _id, username });
    } catch (error) {
        return res.status(404).json(error);
    }
}

const login = async (req, res) => {
    try {
        const { _id } = await User.checkLogin(req.body);
        req.session.userId = _id;
        return res.json({ message: "success" });
    } catch (error) {
        return res.status(400).json(error);
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    return res.json({ message: "success" });
}

export default { getLoggedUser, login, logout };