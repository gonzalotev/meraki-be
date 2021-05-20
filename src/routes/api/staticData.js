const {
    StaticDataController,
    StaticalVariableController,
    NomenclatorsController,
    LotsController,
    RolesController,
    NewWordController
} = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/staticalVariable').get(StaticalVariableController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetchStaticNomenclators);
    router.route('/lots').get(LotsController.fetchStaticLots);
    router.route('/roles').get(RolesController.fetch);
    router.route('/newWords').get(NewWordController.fetchStaticData);
    return router;
};
