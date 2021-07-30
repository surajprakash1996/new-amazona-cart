
module.exports = (req, res, next) => {
    if(req.user &&  req.user.isSeller ) {
        next();
    }
    else {
        res.status(401).send({message: 'Invalid Seller token.'});
    }
}