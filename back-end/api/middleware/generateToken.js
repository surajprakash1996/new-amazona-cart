const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isSeller: user.isSeller,
        isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });

    return token;
}