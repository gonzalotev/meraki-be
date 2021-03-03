const {Log} = include('models');

class LogService {
    static getLogs(users, params) {
        return Log.getLogs(users, params);
    }
}

module.exports = LogService;
