const {roles} = include('enums');

module.exports = (req, res, next) => {
    const [role] = req.user.roles;
    const userState = req.user.attributes.stateId;

    if ([roles.SUB_COORDINATOR, roles.COORDINATOR].includes(role) &&
    ![req.query.state, req.params.state].includes(userState)) {
        return res.sendStatus(403);
    }
    next();
};
