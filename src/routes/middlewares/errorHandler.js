module.exports = (err, req, res, next) => {
    if (err) {
        console.error(err);
        return res.status(err.status || 403).send({
            message: err.sqlMessage || err.message,
            errors: err.errors
        });
    }
    next();
};
