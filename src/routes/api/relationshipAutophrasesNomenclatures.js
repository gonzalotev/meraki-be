const {RelationshipAutophrasesNomenclatureController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophrasesNomenclatureController.fetch)
        .post(RelationshipAutophrasesNomenclatureController.create);
    router.route('/downloadCsv').get(RelationshipAutophrasesNomenclatureController.downloadCsv);
    router.route('/:autophraseId/:nomenclatorId/:nomenclatureId')
        .get(RelationshipAutophrasesNomenclatureController.find)
        .put(RelationshipAutophrasesNomenclatureController.update)
        .delete(RelationshipAutophrasesNomenclatureController.delete);
    return router;
};
