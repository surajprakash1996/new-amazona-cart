
module.exports = (req, res, next) => {
    if(req.user &&  (req.user.isAdmin || req.user.isSeller) ) {
        next();
    }
    else {
        res.status(401).send({message: 'Invalid Seller Or Admin token.'});
    }
}