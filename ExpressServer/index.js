import express from 'express';
import Stripe from 'stripe';


const app = express();
const port = 3000;
const PUBLISHABLE_KEY = 'pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA';
const SECRET_KEY = 'sk_test_51MwZH3AmdXqnDkBiigltL6iQaljZwIxaGnHVJjNetVWdx7tcY0zQ5w3zq0m3W2PsexjskdIJa48Yb2KL09N0R20100zrzXUeQL';

app.listen(port, () => {

    console.log(`Listening at http://localhost:${port}`)
});

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ['card'] //by default
      });
  
      const clientSecret = paymentIntent.client_secret;
  
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

  app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2022-11-15'}
    );
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
    });
    res.json({
      setupIntent: setupIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA'
    })
  });