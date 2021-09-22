const {WordCorrectorController} = include('controllers');
const {validateWords} = include('routes/middlewares');

module.exports = router => {
    router.route('/')
        .get(WordCorrectorController.fetch)
        .post(WordCorrectorController.create)
        .put(validateWords, WordCorrectorController.update)
        .delete(WordCorrectorController.delete);
    router.route('/downloadCsv').get(WordCorrectorController.downloadCsv);
    router.route('/:wrong/:right').get(WordCorrectorController.find);
    return router;
};
