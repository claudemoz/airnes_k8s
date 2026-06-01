const router = require("express").Router();
const paymentIntentController = require("@controllers/payment_intent.controllers");
const { createCustomerAndPaymentMethod } = require("@services/stripe");
const { verifyToken, verifyRoles } = require("@middlewares");

router.get("/get-payment-user/:userId",     verifyToken, paymentIntentController.getPaymentByUser);
router.post("/create-payment",              verifyToken, paymentIntentController.createPayment);
router.put("/update-payment/:paymentId",    verifyToken, paymentIntentController.updatePayment);
router.delete("/delete-payment/:paymentId", verifyToken, paymentIntentController.deletePayment);
router.post("/add-method-payment-to-user", createCustomerAndPaymentMethod)
router.get("/getCustomerData", paymentIntentController.getCustomerData)

module.exports = router;
