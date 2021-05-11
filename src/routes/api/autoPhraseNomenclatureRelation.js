const {AutoPhraseNomenclatureRelationController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AutoPhraseNomenclatureRelationController.fetch)
        .post(AutoPhraseNomenclatureRelationController.create);
    router.route('/:nomenclatorId/:nomenclatureId/:autoPhraseId')
        .get(AutoPhraseNomenclatureRelationController.find)
        .put(AutoPhraseNomenclatureRelationController.update)
        .delete(AutoPhraseNomenclatureRelationController.delete);
    return router;
};
