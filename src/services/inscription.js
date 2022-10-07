const knex = include('helpers/database');

class InscriptionService {
    static async fetch() {
        const duties = await knex.select('*')
            .from('Inscripcion')
            .innerJoin('Disciplina', 'Disciplina.IdDisciplina', 'Inscripcion.IdDisciplina')
            .innerJoin('Horarios', 'Horarios.IdHorario', 'Inscripcion.IdHorario');
        return duties.map(duty => ({
            idInsciption: duty.IdInscipcion,
            documentId: duty.IdUser,
            name: duty.Nombre,
            surname: duty.Apellido,
            discipline: duty.IdDisciplina,
            phone: duty.Telefono,
            email: duty.Email
        }));
    }

    static deleteOne(idInsciption){
        return knex.from('Inscripcion')
            .where({IdInscipcion: idInsciption})
            .del();
    }

    static create(values){
        return knex.insert({
            IdUser: values.documentId,
            Nombre: values.name,
            Apellido: values.surname,
            IdDisciplina: values.discipline,
            Telefono: values.phone,
            Email: values.email
        })
            .into('Inscripcion');
    }
}

module.exports = InscriptionService;
