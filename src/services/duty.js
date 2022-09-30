const knex = include('helpers/database');

class DutyService {
    static async fetch() {
        const duties = await knex.select('*')
            .from('Arancel')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Arancel.IdDisciplina');
        console.log({duties});
        return duties.map(duty => ({
            idDuty: duty.IdArancel,
            title: duty.Nombre,
            subtitle: duty.Descripcion,
            price: duty.Arancel
        }));
    }

    static findOne(filters){
        const duty = knex.select('*')
            .from('Arancel')
            .where({IdArancel: filters.idDuty});
        return duty;
    }

    static deleteOne(idDuty){
        return knex.from('Arancel')
            .where({IdArancel: idDuty})
            .del();
    }

    static create(params){
        const duty = knex.insert({
            idDisciplina: params.idDiscipline,
            Arancel: params.duty
        })
            .into('Arancel');
        return duty;
    }

    static update(params, idDuty){
        const duty = knex('Arancel')
            .update({
                idDisciplina: params.idDiscipline,
                Arancel: params.duty
            })
            .where(idDuty);
        return duty;
    }
}

module.exports = DutyService;
