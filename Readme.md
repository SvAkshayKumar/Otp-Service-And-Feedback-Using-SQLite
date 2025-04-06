# OTP & Feedback Email Service

This is a Node.js + Express service that provides:
- OTP generation and verification with email delivery.
- General-purpose feedback submission via email.
- Thank-you/response email service with styled templates.

## 🌐 Tech Stack

- Node.js
- Express.js
- Nodemailer
- better-sqlite3
- TypeScript

## ⚙️ Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
PORT=5001
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
ALLOWED_DOMAINS=gmail.com,yahoo.com
```

4. Start the server

```bash
npm run dev
```

---

## 📮 API Endpoints

### `POST /api/otp/generate`

Generate and send an OTP to an email.

**Request:**

```json
{
  "email": "adevadiga2005@gmail.com",
  "type": "numeric",
  "organization": "R V University",
  "subject": "Your OTP Code"
}
```

**Response:**

```json
{
  "message": "OTP is generated and sent to your email"
}
```

---

### `POST /api/otp/verify`

Verify the OTP.

**Request:**

```json
{
  "email": "adevadiga2005@gmail.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "message": "OTP is verified"
}
```

---

### `POST /api/feedback/send`

Send feedback to the system admin.

**Request:**

```json
{
  "name": "Akshay",
  "email": "adevadiga2005@gmail.com",
  "message": "Loved the service!"
}
```

**Response:**

```json
{
  "message": "Feedback sent successfully"
}
```

✅ Uses a beautifully styled HTML email template.

---

### `POST /api/feedback/respond`

Send a thank-you or custom response email.

**Request (With custom HTML):**

```json
{
  "name": "Support Team",
  "email": "adevadiga2005@gmail.com",
  "subject": "Thank you for your feedback!",
  "html": "<h1 style='color: teal;'>Thanks!</h1><p>We appreciate your feedback.</p>"
}
```

**OR (Default styled template will be used if `html` is not passed):**

```json
{
  "name": "Support Team",
  "email": "adevadiga2005@gmail.com",
  "subject": "Thanks again!"
}
```

**Response:**

```json
{
  "message": "Response email sent successfully"
}
```

---

## ✅ Test from Browser Console

Paste this into your browser console to test the thank-you route:

```js
fetch('http://localhost:5001/api/feedback/respond', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Support Team",
    email: "adevadiga2005@gmail.com",
    subject: "Thank You for Reaching Out",
    html: "<div style='font-family: Arial; padding: 20px; background: #f3f3f3; border-radius: 10px;'><h2 style='color: #4CAF50;'>Thank You!</h2><p>We’ve received your feedback and appreciate your time.</p></div>"
  })
})
.then(data => data.json())
.then(data => console.log("✅ Thank-you Sent:", data))
.catch(err => console.error("❌ Error:", err));
```

---

## ✨ Styling

- OTP and Thank-you templates are mobile-friendly and styled using inline CSS.
- Templates can be overridden by passing `html` in request body.

---

## 📂 Project Structure

```
src/
├── controllers/
│   └── otpController.ts
│   └── sendMailController.ts
├── routes/
│   └── otpRoutes.ts
├── utils/
│   └── logger.ts
│   └── generateOtp.ts
│   └── validator.ts
├── middleware/
│   └── index.ts
├── config/
│   └── db.ts
└── index.ts
```

---

## 🧠 Author

Made with 💙 by Akshay  
📧 adevadiga2005@gmail.com

---

## 📜 License

MIT

