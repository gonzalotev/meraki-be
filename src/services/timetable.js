const knex = include('helpers/database');

class TimetableService {
    static async fetch() {
        const timetables = await knex.select('*')
            .from('Horarios')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Horarios.IdDisciplina')
            .orderBy('Horarios.Horario');
        return timetables.map(timetable => ({
            idTimetable: timetable.IdHorario,
            discipline: timetable.Nombre,
            day: timetable.Dia,
            schedule: timetable.Horario
        }));
    }

    /* static async fetch(){
        const timetables = await knex.raw(`select JSON_OBJECT(
        'day', h.Dia,
            'discipline', d.Nombre,
            'idTimetable', h.IdHorario,
            'schedule', h.Horario`)
            .from Horarios h
            .inner join Disciplina d on d.IdDisciplina = h.IdDisciplina
            .order by h.Horario');
        return timetables;
    }*/

    static async findOne(id) {
        const timetable = await knex.select('*')
            .from('Horarios')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Horarios.IdDisciplina')
            .where({IdHorario: id})
            .first();
        return {
            idTimetable: timetable.IdHorario,
            discipline: timetable.IdDisciplina,
            disciplineDescription: timetable.Nombre,
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
