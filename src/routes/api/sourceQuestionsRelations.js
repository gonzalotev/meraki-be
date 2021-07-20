const {SourceQuestionsRelationsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(SourceQuestionsRelationsController.fetch)
        .post(SourceQuestionsRelationsController.create);
    router.route('/downloadCsv').get(SourceQuestionsRelationsController.downloadCsv);
    router.route('/options').get(SourceQuestionsRelationsController.getOptions);
    router.route('/:sourceId/:questionId')
        .put(SourceQuestionsRelationsController.update)
        .get(SourceQuestionsRelationsController.find)
        .delete(SourceQuestionsRelationsController.delete);
    return router;
};
