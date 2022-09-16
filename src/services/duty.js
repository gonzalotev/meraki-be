const knex = include('helpers/database');

class DutyService {
    static fetch() {
        const duty = knex.select('*').from('Arancel');
        return duty;
    }
}

module.exports = DutyService;
