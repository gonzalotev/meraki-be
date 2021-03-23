const {OperativesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(OperativesController.fetch);
        /*.post(OperativesController.create);
    router.route('/:id')
        .put(OperativesController.update)
        .delete(OperativesController.delete);
*/
    return router;
};
