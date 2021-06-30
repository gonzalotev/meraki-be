const {AutoPhraseController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AutoPhraseController.fetch)
        .post(AutoPhraseController.create);
    router.route('/downloadCsv').get(AutoPhraseController.downloadCsv);
    router.route('/:id')
        .get(AutoPhraseController.find)
        .put(AutoPhraseController.update)
        .delete(AutoPhraseController.delete);
    return router;
};
