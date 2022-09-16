const knex = include('helpers/database');

class TimetableService {
    static fetch() {
        const timetable = knex.select('*').from('Horarios');
        return timetable;
    }
}

module.exports = TimetableService;
