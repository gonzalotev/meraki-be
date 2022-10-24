const knex = include('helpers/database');

class DisciplineService {
    static create(values){
        return knex.insert({
            Nombre: values.name
        })
            .into('Disciplina');
    }
}

module.exports = DisciplineService;
