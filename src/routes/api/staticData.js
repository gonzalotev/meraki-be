const {
    StaticDataController,
    StatisticalVariableController,
    NomenclatorsController,
    LotsController,
    RolesController
} = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/statisticalVariable').get(StatisticalVariableController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetch);
    router.route('/lots').get(LotsController.fetch);
    router.route('/roles').get(RolesController.fetch);

    return router;
};
