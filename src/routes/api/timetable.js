const {TimetableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TimetableController.fetch)
        .post(TimetableController.create);
    router.route('/:id')
        .get(TimetableController.find)
        .put(TimetableController.update)
        .delete(TimetableController.delete);
    return router;
};
