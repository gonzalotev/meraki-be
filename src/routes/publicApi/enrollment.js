const {EnrollmentController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(EnrollmentController.fetch);
    return router;
};
