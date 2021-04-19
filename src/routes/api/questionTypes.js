const {QuestionTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(QuestionTypeController.fetch)
        .post(QuestionTypeController.create);
    router.route('/:id')
        .get(QuestionTypeController.find)
        .put(QuestionTypeController.update)
        .delete(QuestionTypeController.delete);
    return router;
};
