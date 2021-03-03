const {roles: rolesEnums} = include('enums');

module.exports = (roles = []) => (req, res, next) => {
    const [role] = req.user.roles;

    if ([rolesEnums.POLLSTER].includes(role) || !roles.includes(role)) {
        return res.sendStatus(403);
    }
    next();
};
