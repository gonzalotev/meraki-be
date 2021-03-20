const {
    StaticDataController,
    StatisticalVariableController,
    NomenclatorsController,
    LotsController
} = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/statisticalVariable').get(StatisticalVariableController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetch);
    router.route('/lots').get(LotsController.fetch);

    return router;
};
