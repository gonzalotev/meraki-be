module.exports = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        survey: {type: 'number'},
        metadata: {
            type: 'object',
            properties: {
                entity: {type: 'string'}
            }
        },
        household: {type: 'number'},
        characteristics: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                age: {type: 'number'},
                quantity: {type: 'string'},
                relationshipWithHouseholdHead: {type: 'number'},
                gender: {type: 'number'},
                genderConsideration: {type: 'number'},
                genderSpecification: {type: 'string'},
                maritalStatus: {type: 'number'},
                educationalAttendance: {type: 'number'},
                educationalType: {type: 'number'},
                educationalTime: {
                    type: 'object',
                    properties: {
                        hour: {type: 'string'},
                        minute: {type: 'string'},
                        dontKnow: {type: 'number'}
                    }
                },
                maxEducationalAttendance: {type: 'number'},
                finishedLevel: {type: 'number'},
                lastApprovedLevel: {type: 'number'},
                isAssociatedWith: {
                    type: 'object',
                    properties: {
                        socialWork: {type: 'number'},
                        pami: {type: 'number'},
                        prepaidThroughSocialWork: {type: 'number'},
                        prepaidForVoluntaryWork: {type: 'number'},
                        medicalEmergencyService: {type: 'number'},
                        stateHealthPlan: {type: 'number'},
                        noneOfTheAbove: {type: 'number'},
                        dontKnow: {type: 'number'}
                    }
                },
                needHelpToMakeActivities: {type: 'number'},
                status: {type: 'number'}
            }
        },
        laborSituation: {
            type: 'object',
            properties: {
                lastWeekWorkOneHour: {type: 'number'},
                isAPaidWork: {type: 'number'},
                noWorkLastWeekReason: {type: 'number'},
                firstReasonForNotWorking: {type: 'number'},
                noWorkReason: {type: 'number'},
                lastThirtyDaysSearchWork: {type: 'number'},
                noSearchWorkReason: {type: 'number'},
                noSearchWorkReasonSpecification: {type: 'string'},
                weekHours: {type: 'number'},
                wayOfWorking: {type: 'number'},
                salariedPeopleAreEmployed: {type: 'number'},
                haveRetirementDiscount: {type: 'number'},
                contributesToARetirementSystem: {type: 'number'},
                status: {type: 'number'}
            }
        },
        careSeekers: {
            type: 'object',
            properties: {
                takeCare: {
                    type: 'object',
                    properties: {
                        aRelativeCaresForHim: {type: 'number'},
                        personWhoDoesNotReceivePayment: {type: 'number'},
                        communityOrganization: {type: 'number'},
                        stateInstitution: {type: 'number'},
                        householdMember: {type: 'number'},
                        personOrInstitution: {type: 'number'},
                        other: {type: 'number'},
                        specification: {type: 'string'},
                        nobody: {type: 'number'}
                    }
                },
                thePaidIsMake: {
                    type: 'object',
                    properties: {
                        youOrAnotherMember: {type: 'number'},
                        relative: {type: 'number'},
                        medicalCare: {type: 'number'},
                        prepaid: {type: 'number'},
                        pami: {type: 'number'},
                        other: {type: 'number'},
                        specification: {type: 'string'}
                    }
                },
                status: {type: 'number'}
            }
        },
        voluntaryWork: {
            type: 'object',
            properties: {
                didVolunteerWork: {type: 'number'},
                status: {type: 'number'}
            }
        },
        timeUseIntroduction: {
            type: 'object',
            properties: {
                day: {type: 'number'},
                yesterdayWasALaborDay: {type: 'number'},
                laborDayType: {type: 'number'},
                noLaborDayType: {type: 'number'},
                status: {type: 'number'}
            }
        },
        rescueQuestions: {
            type: 'object',
            properties: {
                takeCareOfChildrenFromZeroToThirteen: {type: 'number'},
                mentionTakeCareOfChildrenFromZeroToThirteen: {type: 'number'},
                takeCareOfPeopleOverSixtyFive: {type: 'number'},
                mentionTakeCareOfPeopleOverSixtyFive: {type: 'number'},
                takeCareOfPeopleWithDisabilities: {type: 'number'},
                mentionTakeCareOfPeopleWithDisabilities: {type: 'number'},
                status: {type: 'number'}
            }
        },
        memberResponse: {
            type: 'object',
            properties: {
                response: {type: 'number'},
                noResponseReason: {type: 'number'},
                otherMotives: {type: 'string'},
                noResponseCause: {type: 'number'},
                status: {type: 'number'}
            }
        },
        selectedMember: {type: 'boolean'},
        isCareSeeker: {type: 'boolean'},
        isRespondent: {type: 'boolean'},
        activityDiary: {
            type: 'object',
            properties: {
                status: {type: 'number'},
                date: {type: 'string'},
                activities: {
                    type: 'array',
                    items: {$ref: '#/components/schemas/ActivityDiary'}
                }
            }
        },
        income: {
            type: 'object',
            properties: {
                income: {type: 'number'},
                mount: {type: 'string'},
                incomeRange: {type: 'number'},
                status: {type: 'number'}
            }
        },
        hasJob: {type: 'boolean'}
    }
};
