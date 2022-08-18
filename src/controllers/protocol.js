const {ProtocolService} = include('services');

class ProtocolController {
    static async fetch(req, res, next) {
        try {
            const protocol = await ProtocolService.fetch();
            console.log(protocol);
            res.send(protocol);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProtocolController;
