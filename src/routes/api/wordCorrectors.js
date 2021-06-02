const {WordCorrectorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(WordCorrectorController.fetch)
        .post(WordCorrectorController.create);
    router.route('/:incorrect')
        .get(WordCorrectorController.find)
        .put(WordCorrectorController.update)
        .delete(WordCorrectorController.delete);
    return router;
};
