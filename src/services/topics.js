const knex = include('helpers/database');

class TopicsService {
    static async fetch() {
        const topics = await knex.select('*').from('Disciplina');
        return topics.map(topic => ({
            id: topic.IdDisciplina,
            name: topic.Nombre
        }));
    }

    static create(values){
        return knex.insert({
            Nombre: values.name
        })
            .into('Disciplina');
    }

}

module.exports = TopicsService;
