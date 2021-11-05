const { LotsService } = include('services');
const {splitFileName} = include('util');
const isEmpty = require('lodash/isEmpty');
const head = require('lodash/head');
const toUpper = require('lodash/toUpper');
const fs = require('fs');

class LotsController {
    static async fetch(req, res, next) {
        try {
            const lotss = await LotsService.fetch();
            res.send({ lotss });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const lot = await LotsService.findOne(req.params);
            res.send({ lot });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const lot = await LotsService.create(req.body, req.user.id);
            res.status(201);
            res.json({ lot });
            next();
        } catch (err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
            }
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const lot = await LotsService.update(req.params, req.body);
            res.json({ success: true, lot });
            next();
        } catch (err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
            }
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await LotsService.delete(req.params, req.user.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const { id } = req.params;
            const lot = await LotsService.findOne({ lotId: id });
            res.send({ lot });
        } catch (error) {
            next(error);
        }
    }
    static async fetchStaticLots(req, res, next) {
        try {
            const lots = await LotsService.fetchStaticLots();
            res.send({ lots });
        } catch (err) {
            next(err);
        }
    }

    static validateFile (req, res, next) {
        let lotFile;
        if (!isEmpty(req.files)) {
            lotFile = head(req.files);
        }
        if (lotFile && lotFile.fieldname === 'lotFile') {
            const { originalname } = lotFile;
            const [fileName, fileFormat] = splitFileName(toUpper(originalname));
            if (fileName && fileFormat) {
                req.body.lotFile = lotFile;
                req.body.fileName = fileName;
                req.body.fileFormat = fileFormat;
                req.saveFile = fileName && fileFormat;
            }
        } else {
            req.body.lotFile = null;
        }
        next();
    }

    static async saveLotFile (req, res, next) {
        try {
            if (req.saveFile) {
                const {fileName, fileFormat, lotFile} = req.body;
                await fs.writeFileSync(`public/lots/${fileName}.${fileFormat}`, lotFile.buffer);
                return res.end();
            }
            res.end();
        } catch(err) {
            next(err);
        }
    }

    static async runLinguisticProcess(req, res, next){
        try{
            const { lotId, operativeId } = req.body.lot;
            const plSqlresponse = await LotsService.runLinguisticProcess({ lotId, operativeId }, req.user.id);
            res.send({plSqlresponse});
        }catch(error){
            next(error);
        }
    }
}

module.exports = LotsController;
