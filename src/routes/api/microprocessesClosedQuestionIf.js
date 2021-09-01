const {MicroprocessesClosedQuestionIfController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesClosedQuestionIfController.fetch)
        .post(MicroprocessesClosedQuestionIfController.create);
    router.route('/downloadCsv').get(MicroprocessesClosedQuestionIfController.downloadCsv);
    router.route('/:id')
        .get(MicroprocessesClosedQuestionIfController.find)
        .put(MicroprocessesClosedQuestionIfController.update)
        .delete(MicroprocessesClosedQuestionIfController.delete);
    return router;
};
