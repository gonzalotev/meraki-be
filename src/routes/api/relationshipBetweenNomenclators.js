const {RelationshipBetweenNomenclatorsController} = include('controllers');

module.exports = router => {

    router.route('/')
        .get(RelationshipBetweenNomenclatorsController.fetch)
        .post(RelationshipBetweenNomenclatorsController.create);
    router.route('/downloadCsv').get(RelationshipBetweenNomenclatorsController.downloadCsv);
    router.route('/:correspondenceId')
        .get(RelationshipBetweenNomenclatorsController.find)
        .delete(RelationshipBetweenNomenclatorsController.delete)
        .put(RelationshipBetweenNomenclatorsController.update);
    return router;
};
