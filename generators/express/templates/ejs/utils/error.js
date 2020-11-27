module.exports = (req, res, next) => {
    if(res.status >= 400){
        res.status(res.status).json({ error: true, code: res.status });
    }
    next();
}