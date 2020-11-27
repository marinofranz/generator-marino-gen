const router = require("express").Router();

const PagesRouter = require("./pages");

router.use("/pages", PagesRouter);

router.get("/", (req, res) => {

});

module.exports = router;