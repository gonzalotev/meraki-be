const {EnrollmentController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(EnrollmentController.fetch);
    router.route('/:id')
        .put(EnrollmentController.update);
    return router;
};
