const {
    StaticDataController,
    StatisticalVariableController,
    NomenclatorsController,
    LotsController,
    RolesController
} = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/statisticalVariable').get(StatisticalVariableController.fetchStaticVariables);
    router.route('/shortDescription').get(NomenclatorsController.fetchStaticNomenclators);
    router.route('/lots').get(LotsController.fetchStaticLots);
    router.route('/roles').get(RolesController.fetch);

    return router;
};
