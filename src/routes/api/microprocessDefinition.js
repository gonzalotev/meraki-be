const { MicroprocessDefinitionController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessDefinitionController.fetch)
        .post(MicroprocessDefinitionController.create);
    router.route('/:id')
        .get(MicroprocessDefinitionController.find)
        .put(MicroprocessDefinitionController.update)
        .delete(MicroprocessDefinitionController.delete);
    return router;
};
