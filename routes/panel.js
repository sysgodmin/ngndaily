var express = require("express")
router = express.Router();
var io = require('../socket');


router.get('/', function (req, res) {
    res.render('panel', {
        title: "NGN",
        message: "NGN Daily writer panel"
    });
});
module.exports = router;