const router = require("express").Router();
const orderControllers = require("@controllers/order.controllers");
const { checkApiKey } = require("@middlewares");

const {
  createCheckoutSession,
  createPaymentIntent,
  initOrder,
} = require("@services/stripe");
const { verifyToken, verifyRoles } = require("@middlewares");

router.post("/create-order", checkApiKey, orderControllers.createOrder);
router.post("/create-checkout-session", checkApiKey, createCheckoutSession);
router.post(
  "/create-payment-intent",
  checkApiKey,
  verifyToken,
  createPaymentIntent
);
router.post("/webhook", initOrder);
router.get("/get-order/:orderId", checkApiKey, orderControllers.getOrder);
router.get(
  "/get-user-orders",
  checkApiKey,
  verifyToken,
  orderControllers.getOrdersByUser
);
// router.get("/get-user-orders", verifyToken);
router.get("/get-orders", checkApiKey, orderControllers.getOrders);
router.put(
  "/update-order/:orderId",
  checkApiKey,
  verifyToken,
  verifyRoles(["admin", "superAdmin"]),
  orderControllers.updateOrder
);
router.delete(
  "/delete-order/:orderId",
  checkApiKey,
  verifyToken,
  verifyRoles(["admin", "superAdmin"]),
  orderControllers.deleteOrder
);
router.post(
  "/delete-many-orders/",
  checkApiKey,
  verifyToken,
  verifyRoles(["admin", "superAdmin"]),
  orderControllers.deleteManyOrders
);
// router.get("/get-invoice", orderControllers.getInvoice);
// router.get("/get-invoice", orderControllers.generateInvoice);

module.exports = router;
