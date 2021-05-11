const {AutoPhraseClosedQuestionController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(AutoPhraseClosedQuestionController.fetch)
        .post(AutoPhraseClosedQuestionController.create);
    router.route('/:autoPhraseId/:sourceId/:questionId')
        .get(AutoPhraseClosedQuestionController.find)
        .put(AutoPhraseClosedQuestionController.update)
        .delete(AutoPhraseClosedQuestionController.delete);
    return router;
};
