const knex = include('helpers/database');

class InscriptionService {
    static async fetch() {
        const schedule = 'SUBSTRING(CAST(Horarios.Horario AS TIME), 1, 5)';
        const record = `JSON_OBJECT("schedule", ${schedule}, "day", Horarios.Dia, "discipline", Disciplina.Nombre`;
        const assignment = `JSON_ARRAYAGG(${record})`;
        const timetableSelect = `IF(COUNT(Horarios.Dia) = 0, JSON_ARRAY(), ${assignment})) as timetable`;

        const inscriptions = await knex.select(
            'Inscripcion.IdInscripcion',
            'Inscripcion.Nombre',
            'Inscripcion.Apellido',
            'Inscripcion.Telefono',
            'Inscripcion.Email',
            'Inscripcion.Documento',
            'Inscripcion.Nombre_Padre',
            'Inscripcion.Nombre_Madre',
            'Inscripcion.Fecha_Nacimiento',
            'Inscripcion.Telefono_Madre',
            'Inscripcion.Direccion',
            'Inscripcion.Telefono_Padre',
            'Inscripcion.Personas_Authorizadas',
            'Inscripcion.Obra_Social',
            'Inscripcion.Consideraciones_Medicas',
            'Inscripcion.Permitir_Irse',
            knex.raw(timetableSelect),
        )
            .from('Inscripcion')
            .leftJoin('Asignacion', 'Inscripcion.IdInscripcion', 'Asignacion.IdInscripcion')
            .leftJoin('Horarios', 'Horarios.IdHorario', 'Asignacion.IdHorario')
            .leftJoin('Disciplina', 'Horarios.IdDisciplina', 'Disciplina.IdDisciplina')
            .groupBy('Inscripcion.IdInscripcion');

        return inscriptions.map(inscription => ({
            id: inscription.IdInscripcion,
            documentId: inscription.Documento,
            name: inscription.Nombre,
            surname: inscription.Apellido,
            phone: inscription.Telefono,
            email: inscription.Email,
            birthdate: inscription.Fecha_Nacimiento,
            address: inscription.Direccion,
            motherName: inscription.Nombre_Madre,
            motherPhone: inscription.Telefono_Madre,
            fatherName: inscription.Nombre_Padre,
            fatherPhone: inscription.Telefono_Padre,
            allowGoAlone: !!inscription.Permitir_Irse,
            medicalConsiderations: inscription.Consideraciones_Medicas,
            socialWork: inscription.Obra_social,
            personsAuthorized: inscription.Personas_Authorizadas,
            timetable: JSON.parse(inscription.timetable)
        }));
    }

    static deleteOne(idInsciption) {
        return knex.raw(`call sp_Del_Asig_Insc (${idInsciption});`);
    }

    static async create(values){
        const inscription = await knex.insert({
            Nombre: values.name,
            Apellido: values.surname,
            Telefono: values.phone,
            Email: values.email,
            Documento: values.documentId,
            Nombre_Padre: values.fatherName,
            Nombre_Madre: values.motherName,
            Fecha_Nacimiento: values.birthdate,
            Telefono_Madre: values.motherPhone,
            Direccion: values.address,
            Telefono_Padre: values.fatherPhone,
            Personas_Authorizadas: values.personsAuthorized,
            Obra_social: values.socialWork,
            Consideraciones_Medicas: values.medicalConsiderations,
            Permitir_Irse: values.allowGoAlone ? 1 : 0,
            Fecha_inscripcion: new Date()
        })
            .into('Inscripcion');
        const assignments = values.disciplines.map(discipline => ({IdInscripcion: inscription, IdHorario: discipline}));
        console.log(inscription);
        return knex
            .insert(assignments)
            .returning('*')
            .into('Asignacion');
    }
}

module.exports = InscriptionService;
