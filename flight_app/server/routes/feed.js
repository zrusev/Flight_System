const router = require('express').Router();
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/flights', feedController.getFlights);
router.get('/flights/:flightId', feedController.getFlightById);

router.post('/tickets/create', isAuth, feedController.createTicket);

// router.delete('/post/delete/:postId', isAuth ,feedController.deletePost);
// router.put('/post/update/:postId', isAuth ,feedController.updatePost);

module.exports = router;