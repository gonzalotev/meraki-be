const {MicroprocessesStepsOptionController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesStepsOptionController.fetch)
        .post(MicroprocessesStepsOptionController.create);
    router.route('/downloadCsv').get(MicroprocessesStepsOptionController.downloadCsv);
    router.route('/:microprocessId/:orderId/:sourceId/:questionId')
        .get(MicroprocessesStepsOptionController.find)
        .delete(MicroprocessesStepsOptionController.delete)
        .put(MicroprocessesStepsOptionController.update);
    return router;
};
