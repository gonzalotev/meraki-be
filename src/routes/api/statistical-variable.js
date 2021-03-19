const { VariableStadisticsController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(VariableStadisticsController.fetch)
        .post(VariableStadisticsController.create);
    router.route('/:id/')
        .put(VariableStadisticsController.update)
        .delete(VariableStadisticsController.delete)
        .get(VariableStadisticsController.fetchOne);
    return router;
};
