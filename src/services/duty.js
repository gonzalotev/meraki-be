const knex = include('helpers/database');

class DutyService {
    static async fetch() {
        const duties = await knex.select('*')
            .from('Arancel')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Arancel.IdDisciplina');
        console.log({duties});
        return duties.map(duty => ({
            title: duty.Nombre,
            subtitle: duty.Descripcion,
            price: duty.Arancel
        }));
    }
}

module.exports = DutyService;
