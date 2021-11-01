const {WordCorrectorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(WordCorrectorController.fetch)
        .post(WordCorrectorController.create)
        .put(WordCorrectorController.update)
        .delete(WordCorrectorController.delete);
    router.route('/downloadCsv').get(WordCorrectorController.downloadCsv);
    router.route('/:wrong/:right').get(WordCorrectorController.find);
    return router;
};
