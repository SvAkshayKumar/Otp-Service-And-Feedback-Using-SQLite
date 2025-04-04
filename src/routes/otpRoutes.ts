import { Router } from 'express';
import OtpController from '../controllers/otpController';
import SendMailController from '../controllers/sendMailController';
import { validateEmail } from '../middleware'; // keeping only email validator if needed

const router = Router();
const otpController = new OtpController();
const sendMailController = new SendMailController();

/**
 * Route to generate OTP and send it via email
 */
router.post('/otp/generate', validateEmail, async (req, res) => {
  try {
    const { email, type = 'numeric', organization = 'R V University', subject = 'One-Time Password (OTP)' } = req.body;

    const otp = await otpController.generateOtp(email, type);
    await sendMailController.sendMail(email, otp, organization, subject);

    res.status(200).json({ message: 'OTP is generated and sent to your email' });
  } catch (error) {
    console.error('🔥 Internal Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/otp/verify', validateEmail, async (req, res) => {
  try {
    const { email, otp } = req.body;

    await otpController.verifyOtp(email, otp?.toString());
    res.status(200).json({ message: 'OTP is verified' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post('/feedback/send', async (req, res) => {
  try {
    const { name, email, subject = `📩 New Feedback from ${name}`, message, html } = req.body;

    await sendMailController.sendMailWithHtml(
      'adevadiga2005@gmail.com', // send to admin
      subject,
      name || 'Anonymous',
      html, // if undefined, fallback will apply
      'feedback',
      { name, message }
    );

    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('❌ Feedback error:', error);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
});

/**
 * Thank-you or response email route — sends to user
 */
router.post('/feedback/thank', async (req, res) => {
  try {
    const { name, email, subject = '🎉 Thank you for your feedback!', html } = req.body;

    await sendMailController.sendMailWithHtml(
      email, // send to user
      subject,
      'Support Team',
      html,
      'thankyou',
      { name }
    );

    res.status(200).json({ message: 'Thank-you email sent successfully' });
  } catch (error) {
    console.error('❌ Thank email error:', error);
    res.status(500).json({ error: 'Failed to send thank-you email' });
  }
});

export default router;
