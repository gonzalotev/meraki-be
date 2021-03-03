module.exports = {
    type: 'object',
    properties: {
        status: {type: 'number'},
        survey: {type: 'number'},
        id: {type: 'number'},
        householdResponse: {
            type: 'object',
            properties: {
                response: {type: 'number'},
                noResponseReason: {type: 'number'},
                noResponseCause: {type: 'number'},
                status: {type: 'number'}
            }
        },
        dwellingCharacteristics: {
            type: 'object',
            properties: {
                dwellingType: {type: 'number'},
                roomsQuantity: {type: 'string'},
                floorsMaterial: {type: 'number'},
                floorsMaterialSpecification: {type: 'string'},
                ceilingMaterial: {type: 'number'},
                ceilingMaterialSpecification: {type: 'string'},
                hasInnerLiner: {type: 'number'},
                cookingFuel: {type: 'number'},
                cookingFuelSpecification: {type: 'string'},
                waterInstallation: {type: 'number'},
                waterProvision: {type: 'number'},
                hasBathroom: {type: 'number'},
                toiletType: {type: 'number'},
                toiletDrain: {type: 'number'},
                status: {type: 'number'}
            }
        },
        householdCharacteristics: {
            type: 'object',
            properties: {
                isExclusiveBathroom: {type: 'number'},
                exclusiveRoomsQuantity: {type: 'string'},
                roomsToSleep: {type: 'string'},
                status: {type: 'number'}
            }
        },
        householdDetection: {
            type: 'object',
            properties: {
                existsOtherDwellingsInTheSameAddress: {type: 'number'},
                shareFoodExpenses: {type: 'number'},
                inThisHouseholdThereAre: {
                    type: 'object',
                    properties: {
                        domesticService: {type: 'number'},
                        pensioners: {type: 'number'}
                    }
                },
                householdsQuantity: {type: 'string'},
                status: {type: 'number'}
            }
        },
        householdIncome: {
            type: 'object',
            properties: {
                income: {type: 'number'},
                mount: {type: 'string'},
                incomeRange: {type: 'number'},
                perceiveSomeIncome: {
                    type: 'object',
                    properties: {
                        universalChildAllowance: {type: 'number'},
                        socialPlans: {type: 'number'}
                    }
                },
                status: {type: 'number'}
            }
        },
        metadata: {
            type: 'object',
            properties: {
                entity: {type: 'string'}
            }
        },
        householdComments: {
            type: 'object',
            properties: {
                telephone: {type: 'number'},
                telephoneNumber: {type: 'string'},
                mobilePhone: {type: 'number'},
                mobilePhoneNumber: {type: 'string'},
                comments: {type: 'string'}
            }
        },
        carePeopleOutsideHome: {
            type: 'object',
            properties: {
                personGreaterThanSixtyFiveNeedsCare: {type: 'number'},
                personGreaterThanSixtyFiveLives: {
                    type: 'object',
                    properties: {
                        nursingHome: {type: 'number'},
                        anotherHousehold: {type: 'number'},
                        other: {type: 'number'},
                        specification: {type: 'string'}
                    }
                },
                nursingHomePaidIsMadeFor: {
                    type: 'object',
                    properties: {
                        personThatLivesInTheNursingHome: {type: 'number'},
                        thisHousehold: {type: 'number'},
                        relativeFromAnotherHousehold: {type: 'number'},
                        socialWork: {type: 'number'},
                        preapid: {type: 'number'},
                        pami: {type: 'number'},
                        other: {type: 'number'},
                        specification: {type: 'string'}
                    }
                },
                status: {type: 'number'}
            }
        },
        domesticWorkActivities: {
            type: 'object',
            properties: {
                whoDoesTheHousework: {
                    type: 'object',
                    properties: {
                        relativeWithoutPaid: {type: 'number'},
                        anotherPersonWithoutPaid: {type: 'number'},
                        personWithPaid: {type: 'number'},
                        householdMembers: {type: 'number'},
                        other: {type: 'number'},
                        specification: {type: 'string'}
                    }
                },
                status: {type: 'number'}
            }
        },
        members: {
            type: 'array',
            items: {$ref: '#/components/schemas/Member'}
        }
    }
};
