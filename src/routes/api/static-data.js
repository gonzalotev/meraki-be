const { StaticDataController, VariableStadisticsController, NomenclatorsController } = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/variable-stadistics').get(VariableStadisticsController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetch);
    return router;
};
