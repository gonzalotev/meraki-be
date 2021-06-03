module.exports = {
    '/api/wordsDictionary': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    words: {
                                        type: 'array',
                                        items: {}
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        post: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            requestBody: {
                description: 'The new word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                word: {type: 'string'},
                                truncate: {type: 'string'},
                                acronim: {type: 'string'},
                                verb: {type: 'boolean'},
                                noun: {type: 'boolean'},
                                adjective: {type: 'boolean'},
                                adverb: {type: 'boolean'},
                                pronoun: {type: 'boolean'},
                                article: {type: 'boolean'},
                                preposition: {type: 'boolean'},
                                doubtWord: {type: 'boolean'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'},
                                hashFunction: {type: 'string'},
                                hash: {type: 'string'},
                                genderId: {type: 'string'},
                                numberId: {type: 'string'},
                                frequency: {type: 'string'},
                                abc: {type: 'string'},
                                family: {type: 'string'}

                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    word: {
                                        type: 'object',
                                        properties: {
                                            word: {type: 'string'},
                                            truncate: {type: 'string'},
                                            acronim: {type: 'string'},
                                            verb: {type: 'boolean'},
                                            noun: {type: 'boolean'},
                                            adjective: {type: 'boolean'},
                                            adverb: {type: 'boolean'},
                                            pronoun: {type: 'boolean'},
                                            article: {type: 'boolean'},
                                            preposition: {type: 'boolean'},
                                            doubtWord: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            hashFunction: {type: 'string'},
                                            hash: {type: 'string'},
                                            genderId: {type: 'string'},
                                            numberId: {type: 'string'},
                                            frequency: {type: 'string'},
                                            abc: {type: 'string'},
                                            family: {type: 'string'}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/wordsDictionary/match/{word}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            parameters: [
                {
                    in: 'path',
                    name: 'word',
                    required: true,
                    schema: {type: 'string'},
                    description: 'word to update'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    word: {
                                        type: 'object',
                                        properties: {
                                            word: {type: 'string'},
                                            truncate: {type: 'string'},
                                            acronim: {type: 'string'},
                                            verb: {type: 'boolean'},
                                            noun: {type: 'boolean'},
                                            adjective: {type: 'boolean'},
                                            adverb: {type: 'boolean'},
                                            pronoun: {type: 'boolean'},
                                            article: {type: 'boolean'},
                                            preposition: {type: 'boolean'},
                                            doubtWord: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            hashFunction: {type: 'string'},
                                            hash: {type: 'string'},
                                            genderId: {type: 'string'},
                                            numberId: {type: 'string'},
                                            frequency: {type: 'string'},
                                            abc: {type: 'string'},
                                            family: {type: 'string'}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/wordsDictionary/{word}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            parameters: [
                {
                    in: 'path',
                    name: 'word',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Word to update'
                }
            ],
            requestBody: {
                description: 'Changes to save',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                word: {type: 'string'},
                                truncate: {type: 'string'},
                                acronim: {type: 'string'},
                                verb: {type: 'boolean'},
                                noun: {type: 'boolean'},
                                adjective: {type: 'boolean'},
                                adverb: {type: 'boolean'},
                                pronoun: {type: 'boolean'},
                                article: {type: 'boolean'},
                                preposition: {type: 'boolean'},
                                doubtWord: {type: 'boolean'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'},
                                hashFunction: {type: 'string'},
                                hash: {type: 'string'},
                                genderId: {type: 'string'},
                                numberId: {type: 'string'},
                                frequency: {type: 'string'},
                                abc: {type: 'string'},
                                family: {type: 'string'}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    word: {
                                        type: 'object',
                                        properties: {
                                            word: {type: 'string'},
                                            truncate: {type: 'string'},
                                            acronim: {type: 'string'},
                                            verb: {type: 'boolean'},
                                            noun: {type: 'boolean'},
                                            adjective: {type: 'boolean'},
                                            adverb: {type: 'boolean'},
                                            pronoun: {type: 'boolean'},
                                            article: {type: 'boolean'},
                                            preposition: {type: 'boolean'},
                                            doubtWord: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            hashFunction: {type: 'string'},
                                            hash: {type: 'string'},
                                            genderId: {type: 'string'},
                                            numberId: {type: 'string'},
                                            frequency: {type: 'string'},
                                            abc: {type: 'string'},
                                            family: {type: 'string'}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        delete: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            parameters: [
                {
                    in: 'path',
                    name: 'word',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Word to delete'
                }
            ],
            responses: {
                204: {
                    description: 'The resource was deleted successfully',
                    content: {'application/json': { schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['Words Dictionary'],
            parameters: [
                {
                    in: 'path',
                    name: 'word',
                    required: true,
                    schema: {type: 'string'},
                    description: 'word to update'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    word: {
                                        type: 'object',
                                        properties: {
                                            word: {type: 'string'},
                                            truncate: {type: 'string'},
                                            acronim: {type: 'string'},
                                            verb: {type: 'boolean'},
                                            noun: {type: 'boolean'},
                                            adjective: {type: 'boolean'},
                                            adverb: {type: 'boolean'},
                                            pronoun: {type: 'boolean'},
                                            article: {type: 'boolean'},
                                            preposition: {type: 'boolean'},
                                            doubtWord: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            hashFunction: {type: 'string'},
                                            hash: {type: 'string'},
                                            genderId: {type: 'string'},
                                            numberId: {type: 'string'},
                                            frequency: {type: 'string'},
                                            abc: {type: 'string'},
                                            family: {type: 'string'}
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
