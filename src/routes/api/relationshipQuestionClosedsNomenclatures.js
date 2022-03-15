const {RelationshipQuestionClosedsNomenclatureController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipQuestionClosedsNomenclatureController.fetch)
        .post(RelationshipQuestionClosedsNomenclatureController.create);
    router.route('/downloadCsv').get(RelationshipQuestionClosedsNomenclatureController.downloadCsv);
    router.route('/:closedQuestionId/:nomenclatorId/:nomenclatureId')
        .get(RelationshipQuestionClosedsNomenclatureController.find)
        .put(RelationshipQuestionClosedsNomenclatureController.update)
        .delete(RelationshipQuestionClosedsNomenclatureController.delete);
    return router;
};
