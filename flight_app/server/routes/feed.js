const router = require('express').Router();
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/flights/page/:page/direction/:direction', feedController.getFlights);
router.get('/flights/flightName/:searchValue', feedController.getFlightByName);
router.get('/flights/:id/codeshares/:flightName', feedController.getFlightById);

router.post('/tickets/create', isAuth, feedController.createTicket);

// router.delete('/post/delete/:postId', isAuth ,feedController.deletePost);
// router.put('/post/update/:postId', isAuth ,feedController.updatePost);

module.exports = router;