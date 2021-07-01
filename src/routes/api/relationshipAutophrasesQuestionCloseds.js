const {RelationshipAutophrasesQuestionClosedController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophrasesQuestionClosedController.fetch)
        .post(RelationshipAutophrasesQuestionClosedController.create);
    router.route('/:autophraseId/:nomenclatorId/:nomenclatureId')
        .get(RelationshipAutophrasesQuestionClosedController.find)
        .put(RelationshipAutophrasesQuestionClosedController.update)
        .delete(RelationshipAutophrasesQuestionClosedController.delete);
    return router;
};
