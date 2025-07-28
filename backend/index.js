const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { students, remarks } = req.body;

  try {
    const sendResults = await Promise.all(
      students.map(student =>
        client.messages.create({
          body: `Hello ${student.name}, Remarks: ${remarks}`,
          from: twilioPhone,
          to:'+91'+ student.phone
        })
      )
    );

    res.json({ success: true, results: sendResults });
  } catch (err) {
    console.error('SMS Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('SMS Server running on http://localhost:3000');
});
