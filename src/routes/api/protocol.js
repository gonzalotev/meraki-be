const {ProtocolController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ProtocolController.fetch)
        .post(ProtocolController.create);
    router.route('/:serialKey')
        .get(ProtocolController.find)
        .put(ProtocolController.update)
        .delete(ProtocolController.delete);
    return router;
};
