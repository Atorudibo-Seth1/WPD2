const express = require('express');
const { send } = require('process');
const router = express.Router();
const controller = require('../controllers/agbControllers.js')
const controller2 = require('../controllers/goalsController.js')

router.get('/', controller.welcome_page)

router.get('/home', controller.home_page)

router.get('/about', controller.about_us)

router.get('/aboutus', controller.real_aboutus)

router.get('/programs', controller.programs) 

router.get('/signin', controller.signin)

router.get('/signup', controller.signup)

router.get('/logout', controller.logout)

router.get('/manager', controller.staff_list)

router.get('/manageradd', controller.manager_add)

router.get('/managerdelete', controller.manager_delete)

router.get('/managerupdate', controller.manager_update)

router.post('/staffUpdate', controller.staffUpdate)

router.post('/newStaff', controller.newStaff)

router.post('/remove', controller.remove)

router.post('/register', controller.register)

router.get('/goals', controller2.goals)

router.get('/goalspage', controller2.goals_add)

router.get('/goaldelete', controller2.goals_delete)

router.get('/goalupdate', controller2.goals_update)

router.post('/newGoal', controller2.newGoal)

router.post('/removeGoal', controller2.removeGoal) 

router.post('/goalUpdate', controller2.goalUpdate)

router.use(function(req, res) {
    res.status(404);
    res.render('404')
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.render('500');
})

module.exports = router;
