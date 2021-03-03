var express = require('express');
var router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_TOKEN);

router.post("/create-checkout-session", async (req, res) => {
    const { priceId } = req.body;
    if (!priceId) {
        res.status(401).send({
            success:false,
            error: {
                message:"price id is required",
            }
        });
        return;
    }
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/canceled.html',
        });

        res.status(200).send({
            sessionId: session.id,
            success:true,
        });
    } catch (e) {
        res.status(400).send({
            error: {
                message: e.message,
            }
        });
    }
});

module.exports = router;