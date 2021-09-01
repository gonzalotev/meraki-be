const {MicroprocessesOptionController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesOptionController.fetch)
        .post(MicroprocessesOptionController.create);
    router.route('/downloadCsv').get(MicroprocessesOptionController.downloadCsv);
    router.route('/:id/:sourceId/:questionId/:orden')
        .get(MicroprocessesOptionController.find)
        .put(MicroprocessesOptionController.update)
        .delete(MicroprocessesOptionController.delete);
    return router;
};
