const {WordCorrectorController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(WordCorrectorController.fetch)
        .post(WordCorrectorController.create);
    router.route('/:id')
        .get(WordCorrectorController.find)
        .put(WordCorrectorController.update)
        .delete(WordCorrectorController.delete);
    return router;
};
