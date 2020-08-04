// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
module.exports = (err, req, res, next) => {
    const statusCode = err.httpCode || 500;

    res.status(statusCode).json({
        status: err.status || 'error',
        error: {
            ...err,
           
        },
    });

};