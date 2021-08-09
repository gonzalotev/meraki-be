const {MicroprocessesListIfController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesListIfController.fetch)
        .post(MicroprocessesListIfController.create);
    router.route('/downloadCsv').get(MicroprocessesListIfController.downloadCsv);
    router.route('/:id')
        .get(MicroprocessesListIfController.find)
        .put(MicroprocessesListIfController.update);
    return router;
};
