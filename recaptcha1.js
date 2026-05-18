const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    const secretKey = 'YOUR_SECRET_KEY';
    const token = req.body['g-recaptcha-response'];

    // Verify reCAPTCHA token
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: token,
            },
        });

        if (response.data.success) {
            res.send('Form submitted successfully!');
        } else {
            res.send('reCAPTCHA verification failed. Please try again.');
        }
    } catch (error) {
        res.status(500).send('Error verifying reCAPTCHA.');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
