class UniqueWordsAndPhrases {
    static async getLotsVariables() {
        return await Promise.resolve([{saludo: 'hola mundo'}]);
    }

    static async runProcess({ lotId, operativeId, variableId }) {
        return await Promise.resolve({ lotId, operativeId, variableId });
    }
}

module.exports = UniqueWordsAndPhrases;
