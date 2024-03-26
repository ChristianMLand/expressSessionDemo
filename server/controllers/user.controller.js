import User from "../models/user.model.js";

export const create = async (req, res) => {
    try {
        const { _id } = await User.create(req.body);
        req.session.userId = _id;
        return res.status(201).json({ message: "success" });
    } catch (error) {
        return res.status(400).json(error);
    }
};

export default { create };