const {TicketTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TicketTypeController.fetch)
        .post(TicketTypeController.create);
    router.route('/downloadCsv').get(TicketTypeController.downloadCsv);
    router.route('/:id')
        .get(TicketTypeController.find)
        .put(TicketTypeController.update)
        .delete(TicketTypeController.delete);
    return router;
};
