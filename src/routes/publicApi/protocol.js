const {ProtocolController} = include('controllers');

module.exports = router => {
    router.route('/').get(ProtocolController.fetch);
    router.route('/:serialKey').get(ProtocolController.find);
    return router;
};
