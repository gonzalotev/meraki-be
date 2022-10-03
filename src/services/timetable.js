const knex = include('helpers/database');

class TimetableService {
    static fetch() {
        return knex.select('*').from('Horarios');
    }
}

module.exports = TimetableService;
