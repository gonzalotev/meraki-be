const {SpecialPhraseTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(SpecialPhraseTypeController.fetch)
        .post(SpecialPhraseTypeController.create);
    router.route('/:id')
        .get(SpecialPhraseTypeController.find)
        .put(SpecialPhraseTypeController.update)
        .delete(SpecialPhraseTypeController.delete);
    return router;
};
