const {ClosedQuestionsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ClosedQuestionsController.fetch)
        .post(ClosedQuestionsController.create);
    router.route('/downloadCsv').get(ClosedQuestionsController.downloadCsv);
    router.route('/:id')
        .get(ClosedQuestionsController.find)
        .put(ClosedQuestionsController.update)
        .delete(ClosedQuestionsController.delete);
    return router;
};
