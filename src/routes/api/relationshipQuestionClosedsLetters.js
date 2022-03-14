const {RelationshipQuestionClosedsLettersController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipQuestionClosedsLettersController.fetch)
        .post(RelationshipQuestionClosedsLettersController.create);
    router.route('/downloadCsv').get(RelationshipQuestionClosedsLettersController.downloadCsv);
    router.route('/:nomenclatorId/:groupId/:nomenclatureGroupId/:questionClosedId')
        .get(RelationshipQuestionClosedsLettersController.find)
        .put(RelationshipQuestionClosedsLettersController.update)
        .delete(RelationshipQuestionClosedsLettersController.delete);
    return router;
};
