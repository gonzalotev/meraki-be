const {RelationshipAutophrasesLettersController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophrasesLettersController.fetch)
        .post(RelationshipAutophrasesLettersController.create);
    router.route('/downloadCsv').get(RelationshipAutophrasesLettersController.downloadCsv);
    router.route('/:nomenclatorId/:groupId/:nomenclatureGroupId/:autophraseId')
        .get(RelationshipAutophrasesLettersController.find)
        .put(RelationshipAutophrasesLettersController.update)
        .delete(RelationshipAutophrasesLettersController.delete);
    return router;
};
