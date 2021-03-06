const router = require('express').Router();


router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login', { layout: false });
});

module.exports = router;