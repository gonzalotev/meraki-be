const {roles} = include('enums');
const {AddressService} = include('services');

module.exports = async (req, res, next) => {
    const {
        state,
        subCoordinator
    } = await AddressService.getData(req.params.id);
    const role = req.user.roles[0];

    if (
        (
            [roles.COORDINATOR, roles.TEAM_LEADER].includes(role)
            && parseInt(state) !== parseInt(req.user.attributes.stateId)
        ) || (
            roles.SUB_COORDINATOR === role
            && req.user.id !== subCoordinator
        )
    ) {
        return res.sendStatus(403);
    }
    next();
};
