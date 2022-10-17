const {ProtocolController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ProtocolController.fetch)
        .put(ProtocolController.update);
    return router;
};
