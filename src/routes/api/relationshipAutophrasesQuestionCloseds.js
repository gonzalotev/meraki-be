const {RelationshipAutophrasesQuestionClosedsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophrasesQuestionClosedsController.fetch)
        .post(RelationshipAutophrasesQuestionClosedsController.create);
    router.route('/downloadCsv').get(RelationshipAutophrasesQuestionClosedsController.downloadCsv);
    router.route('/:autophraseId/:sourceId/:questionId')
        .put(RelationshipAutophrasesQuestionClosedsController.update)
        .get(RelationshipAutophrasesQuestionClosedsController.find)
        .delete(RelationshipAutophrasesQuestionClosedsController.delete);
    return router;
};
