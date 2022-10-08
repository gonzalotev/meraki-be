const knex = include('helpers/database');

class TimetableService {
    static async fetch() {
        const timetables = await knex.select('*')
            .from('Horarios')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Horarios.IdDisciplina');
        return timetables.map(timetable => ({
            idTimetable: timetable.IdHorario,
            discipline: timetable.Nombre,
            day: timetable.Dia,
            schedule: timetable.Horario
        }));
    }

    static async findOne(id) {
        const timetable = await knex.select('*')
            .from('Horarios')
            .where({idTimetable: id})
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Horarios.IdDisciplina')
            .first();
        return {
            idTimetable: timetable.IdHorario,
            discipline: timetable.Nombre,
            day: timetable.Dia,
            schedule: timetable.Horario
        };
    }

    static deleteOne(idTimetable){
        return knex.from('Horarios')
            .where({IdHorario: idTimetable})
            .del();
    }

    static create(values){
        return knex.insert({
            idDisciplina: values.discipline,
            Dia: values.day,
            Horario: values.schedule
        })
            .into('Horarios');
    }

    static update(idTimetable, values){
        return knex('Horarios')
            .update({
                idDisciplina: values.discipline,
                Dia: values.day,
                Horario: values.schedule
            })
            .where({idHorario: idTimetable});
    }
}

module.exports = TimetableService;
