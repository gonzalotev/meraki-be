const {MicroprocessStepsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessStepsController.fetchSteps)
        .post(MicroprocessStepsController.create);
    router.route('/downloadCsv').get(MicroprocessStepsController.downloadCsv);
    router.route('/:microprocessId/:order')
        .get(MicroprocessStepsController.find)
        .put(MicroprocessStepsController.update)
        .delete(MicroprocessStepsController.delete);
    return router;
};
