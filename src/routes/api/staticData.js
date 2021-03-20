<<<<<<< HEAD
const { StaticDataController, VariableStadisticsController, NomenclatorsController, LotsController } = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
    router.route('/variable-stadistics').get(VariableStadisticsController.fetch);
    router.route('/shortDescription').get(NomenclatorsController.fetch);
    router.route('/lots').get(LotsController.fetch);
=======
const { StaticDataController } = include('controllers');

module.exports = router => {
    router.route('/').get(StaticDataController.fetch);
>>>>>>> feat: create dictionary linguistic endpoint
    return router;
};
