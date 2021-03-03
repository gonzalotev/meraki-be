const {Type} = include('models');

class TypeService {
    static getUps(state) {
        return Type.getUps(state);
    }

    static getAreas(state, ups) {
        return Type.getAreas(state, ups);
    }

    static getSegments(state, ups, area) {
        return Type.getSegments(state, ups, area);
    }

    static getFiles() {
        return Type.getFiles();
    }

    static getStatuses() {
        return Type.getStatuses();
    }

    static getAssignmentsTypes() {
        return Type.getAssignmentsTypes();
    }

    static getSituations(status) {
        return Type.getSituations(status);
    }
}

module.exports = TypeService;
