const {Review} = include('models');

class ReviewService {
    static getSurveys(filters) {
        return Review.getSurveys(filters);
    }

    static getSurveyById(id, state, subCoordinator) {
        return Review.getSurveyById(id, state, subCoordinator);
    }

    static getSurveyData(id) {
        return Review.getSurveyData(id);
    }

    static finishSurvey(id) {
        return Review.finishSurvey(id);
    }

    static approveSurvey(id) {
        return Review.approveSurvey(id);
    }

    static reassignSurvey(id, user) {
        return Review.reassignSurvey(id, user);
    }

    static reopenSurvey(id, rol) {
        return Review.reopenSurvey(id, rol);
    }

    static recoverySurvey(id) {
        return Review.recoverySurvey(id);
    }

    static superviseSurvey(id, userId) {
        return Review.superviseSurvey(id, userId);
    }
}

module.exports = ReviewService;
