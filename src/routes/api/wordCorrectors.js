const {WordCorrectorController} = include('controllers');
const {validateWords} = include('routes/middlewares');

module.exports = router => {
    router.route('/')
        .get(WordCorrectorController.fetch)
        .post(WordCorrectorController.create);
    router.route('/:wrong/:right')
        .get(WordCorrectorController.find)
        .put(validateWords, WordCorrectorController.update)
        .delete(WordCorrectorController.delete);
    return router;
};
