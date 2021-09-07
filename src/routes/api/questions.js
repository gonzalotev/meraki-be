const {QuestionsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(QuestionsController.fetch)
        .post(QuestionsController.create);
    router.route('/downloadCsv').get(QuestionsController.downloadCsv);
    router.route('/:id')
        .get(QuestionsController.find)
        .put(QuestionsController.update)
        .delete(QuestionsController.delete);
    return router;
};
