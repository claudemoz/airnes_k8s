const router = require("express").Router();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("@configs/swagger/swagger.json");
const { checkApiKey } = require("@middlewares");

//============= Doc Api ==============
// router.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//============= Resources ==============
router.get("/health", require("@controllers/health.controllers").healthCheck);
router.use("/auth", checkApiKey, require("@routes/auth.routes"));
router.use("/user", checkApiKey, require("@routes/user.routes"));
router.use("/category", checkApiKey, require("@routes/category.routes"));
router.use("/product", checkApiKey, require("@routes/product.routes"));
router.use("/material", checkApiKey, require("@routes/material.routes"));
router.use("/order", require("@routes/order.routes"));
router.use("/contact", checkApiKey, require("@routes/contact.routes"));
router.use("/payment_intent", require("@routes/payment_intent.routes"));

//============= Upload ==============
router.use("/upload", checkApiKey, require("@routes/upload.routes"));
module.exports = router;
