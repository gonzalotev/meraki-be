const {InscriptionController} = include('controllers');

module.exports = router => {
    router.route('/')
        .post(InscriptionController.create);
    return router;
};
