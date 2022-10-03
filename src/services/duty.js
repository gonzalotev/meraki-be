const knex = include('helpers/database');

class DutyService {
    static async fetch() {
        const duties = await knex.select('*')
            .from('Arancel')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Arancel.IdDisciplina');
        return duties.map(duty => ({
            idDuty: duty.IdArancel,
            title: duty.Nombre,
            subtitle: duty.Descripcion,
            price: duty.Arancel
        }));
    }

    static async findOne(id) {
        const duty = await knex.select('*')
            .from('Arancel')
            .where({IdArancel: id})
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Arancel.IdDisciplina')
            .first();
        return {
            idDuty: duty.IdArancel,
            title: duty.Nombre,
            subtitle: duty.Descripcion,
            price: duty.Arancel
        };
    }

    static deleteOne(idDuty){
        return knex.from('Arancel')
            .where({IdArancel: idDuty})
            .del();
    }

    static create(values){
        return knex.insert({
            idDisciplina: 10,
            Arancel: values.price
        })
            .into('Arancel');
    }

    static update(idDuty, values){
        return knex('Arancel')
            .update({
                idDisciplina: 10,
                Arancel: values.price
            })
            .where({idArancel: idDuty});
    }
}

module.exports = DutyService;
