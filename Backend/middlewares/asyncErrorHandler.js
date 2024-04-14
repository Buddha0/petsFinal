export const asyncErrorHandling = (checkFunc) => {
    return (req, res, next) => {
        checkFunc(req, res, next).catch(next);
    };
};