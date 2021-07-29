const router = require("express").Router();
const staticsControllers = require("../controllers/statics");

router.get("/professions",staticsControllers.get_professions);

module.exports = router;