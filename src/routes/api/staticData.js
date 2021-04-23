const {
    StaticDataController,
    StaticalVariableController,
    NomenclatorsController,
    LotsController,
    RolesController
} = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/staticalVariable').get(StaticalVariableController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetchStaticNomenclators);
    router.route('/lots').get(LotsController.fetchStaticLots);
    router.route('/roles').get(RolesController.fetch);

    return router;
};
