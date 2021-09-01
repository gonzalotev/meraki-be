const { MicroprocessesWordsController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesWordsController.fetch)
        .post(MicroprocessesWordsController.create);
    router.route('/downloadCsv').get(MicroprocessesWordsController.downloadCsv);
    router.route('/:idMicroprocess/:idOrder')
        .get(MicroprocessesWordsController.find)
        .put(MicroprocessesWordsController.update)
        .delete(MicroprocessesWordsController.delete);
    return router;
};