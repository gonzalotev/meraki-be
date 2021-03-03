const {Monitoring} = include('models');

class MonitoringService {
    static getMonitoring(filters) {
        return Monitoring.getMonitoring(filters);
    }
}

module.exports = MonitoringService;
