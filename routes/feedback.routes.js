const Router = require('express');
const router = new Router();
const feedbackController = require('../controller/feedback.controller');
router.post('/feedback', feedbackController.createFeedback);

router.get('/feedback', feedbackController.getAllFeedbacks);router.get('/feedback/:id', feedbackController.getFeedbackByUser);
router.put('/feedback', feedbackController.updateFeedback);
router.delete('/feedback/:id', feedbackController.deleteFeedback);
module.exports = router;
