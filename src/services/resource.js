const knex = include('helpers/database');

const getResourceName = resourceName => {
    switch (resourceName) {
        case 'Inicio':
            return 'home';
        case 'Espacios':
            return 'ourSpaces';
    }
    throw new Error('Not found name');
};

class ResourceService {
    static async fetchResource(typeId) {
        const resource = await knex.select('*')
            .from('Tipos')
            .innerJoin('Contenidos', 'Contenidos.IdTipo', 'Tipos.Id')
            .where({'Tipos.Id': Number(typeId)})
            .first();

        const images = await knex.select('*')
            .from('Imagenes')
            .where({'Imagenes.IdTipo': Number(typeId)});

        return {
            id: resource.Id,
            name: getResourceName(resource.Nombre),
            title: resource.Titulo,
            description: resource.Descripcion,
            images: images.map(image => ({
                id: image.Id,
                name: image.Nombre,
                url: image.URL
            }))
        };
    }

    static imageDeleteOne(imageId){
        return knex.from('Imagenes')
            .where({Id: imageId})
            .del();
    }

    static imageCreate({values, type}){
        return knex.insert({
            Nombre: values.name,
            URL: values.url,
            IdTipo: type
        })
            .into('Imagenes');
    }

    static imageUpdate(imageId, {values}){
        return knex('Imagenes')
            .update({
                Nombre: values.name,
                URL: values.url
            })
            .where({Id: imageId});
    }
}

module.exports = ResourceService;
