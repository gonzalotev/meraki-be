const knex = include('helpers/database');

class TopicsService {
    static async fetch() {
        const topics = await knex.select('*').from('Disciplina');
        return topics.map(topic => ({
            id: topic.IdDisciplina,
            name: topic.Nombre
        }));
    }
}

module.exports = TopicsService;
