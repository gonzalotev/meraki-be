const {LogService} = include('services');
const {ArqService} = include('services');
const {buildArchQuery} = include('util');

class LogController {
    static async getLogs(req, res, next) {
        try {
            const token = req.get('Authorization');
            let users = [];
            const {
                term, state: stateId, role
            } = req.body;

            users = await ArqService.fetchUsers(
                buildArchQuery(
                    term ||
                    stateId ||
                    role ? {
                            term,
                            stateId,
                            role
                        } : {}, req.user), token);

            res.send(await LogService.getLogs(
                users,
                req.body
            ));

        } catch(err) {
            next(err);
        }
    }
}

module.exports = LogController;
