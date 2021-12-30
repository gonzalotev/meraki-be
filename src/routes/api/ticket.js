const {TicketController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TicketController.fetch)
        .post(TicketController.create);
    router.route('/downloadCsv').get(TicketController.downloadCsv);
    router.route('/:id')
        .get(TicketController.find)
        .put(TicketController.update)
        .delete(TicketController.delete);
    return router;
};
