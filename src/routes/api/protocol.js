const {ProtocolController} = include('controllers');

module.exports = router => {
    router.route('/').get(ProtocolController.fetch);
    return router;
};
