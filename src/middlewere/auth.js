const jwt = require('jsonwebtoken');
const User = require("../model/user");

const isAuthorised = async (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(403).json({ status: false, error: 'Access denied', data: null });
    }

    try {
        const decoded = jwt.verify(token, `123`);
        req.user = decoded.user;
        console.log(decoded)
        const user = await User.findOne({ email: decoded.user.email });
        if (!user) {

            // const apiResponse = response.generate("false", 'Invalid token found', null, 189);
            return res.status(401).send('Invalid token found');
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(401).json({ status: false, error: 'Invalid token found', data: {}, code: 189 });
    }
};

module.exports = {
    isAuthorised: isAuthorised
};
