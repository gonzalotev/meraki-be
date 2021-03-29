const { ChatTypeService } = include('services');

class ChatTypeController {
    static async fetch(req, res, next) {
        try {
            const chatsTypes = await ChatTypeService.fetch();
            res.send({ chatsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const chatType = await ChatTypeService.findOne(req.params);
            res.send({ chatType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const chatType = await ChatTypeService.create(req.body, req.user.id);
            res.send({ success: true, chatType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const chatType = await ChatTypeService.update(req.params, req.body);
            res.send({success: true, chatType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await ChatTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = ChatTypeController;
