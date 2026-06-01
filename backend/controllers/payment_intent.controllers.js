const { Payment_intent } = require("@models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getPaymentByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const payments = await Payment_intent.find({ userId: userId })
      .populate("userId", "_id ")
      .exec();
    if (!payments) return res.status(404).send("payment not found");
    return res.status(200).send(payments);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
};

exports.createPayment = async (req, res) => {
  const { paymentData } = req.body;
  try {
    if (!paymentData.paymentMethodId || !paymentData.entire_name) {
      return res.status(400).json({ msg: "missing data" });
    }

    let customer = await stripe.customers.list({
      email: req.user.email,
      limit: 1,
    });

    if (customer.data.length > 0) {
      customer = customer.data[0];
    } else {
      // Créer un nouveau client
      customer = await stripe.customers.create({
        name: paymentData.entire_name,
        email: req.user.email,
      });
    }

    const paymentMethod = await stripe.paymentMethods.attach(
      paymentData.paymentMethodId,
      { customer: customer.id }
    );
    if (!paymentMethod) {
      return res.status(400).json({ msg: "Invalid payment method" });
    }

    const { brand, last4, exp_month, exp_year } = paymentMethod.card;
    const expiration_date_formatted = new Date(exp_year, exp_month - 1);
    const payment = await Payment_intent.create({
      entire_name: paymentData.entire_name,
      last4,
      brand,
      expiration_date: expiration_date_formatted,
      userId: req.user._id,
      payment_method_id: paymentData.paymentMethodId,
      payment_card: paymentMethod.card,
    });

    return res.status(201).send(payment);
  } catch (error) {
    console.error("Error saving payment:", error);
    return res.status(500).send();
  }
};

exports.getCustomerData = async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve("cus_QNptwqIddRext4");
    return res.status(200).send(customer);
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).send();
  }
};

exports.updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment_intent.findOneAndUpdate(
      { _id: paymentId },
      req.body,
      { new: true }
    ).exec();
    return res.status(200).send(payment);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const deletedPayment = await Payment_intent.findOneAndDelete({
      _id: paymentId,
    }).exec();

    if (!deletedPayment) {
      return res.status(404).send("payment not found");
    }

    return res.status(200).send(deletedPayment);
  } catch (error) {
    console.error(error);
    return res.status(500).send("");
  }
};
