const knex = include('helpers/database');

class EnrollmentService {
    static async fetch() {
        const enrollment = await knex.select('*')
            .from('Matricula')
            .first();
        return {
            name: enrollment.Name_Mat,
            price: enrollment.Valor
        };
    }

    static update(enrollment){
        return knex('Matricula')
            .update({
                Name_Mat: enrollment.name,
                Valor: enrollment.price
            });
    }
}

module.exports = EnrollmentService;
