import nodemailer from 'nodemailer';

class SendMailController {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  // 🔐 OTP Mail
  async sendMail(email: string, otp: string, organization: string, subject: string): Promise<void> {
    try {
      const mailOptions = {
        from: `"${organization}" <${process.env.GMAIL_USER}>`,
        to: email,
        subject,
        text: `Your OTP is ${otp}`,
        html: this.generateOtpHtmlTemplate(otp, organization),
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error(`Failed to send OTP to ${email}`);
    }
  }

  // ✉️ General-purpose mail (feedback, thank you, etc.)
  async sendMailWithHtml(
    email: string,
    subject: string,
    senderName: string,
    html?: string,
    type: 'feedback' | 'thankyou' = 'feedback',
    fallbackData?: { name?: string; message?: string }
  ): Promise<void> {
    try {
      const mailOptions = {
        from: `"${senderName}" <${process.env.GMAIL_USER}>`,
        to: email,
        subject,
        html:
          html ||
          (type === 'thankyou'
            ? this.defaultThankYouTemplate(fallbackData?.name || 'User')
            : this.defaultFeedbackTemplate(
                fallbackData?.name || 'User',
                email,
                subject,
                fallbackData?.message || 'No message provided'
              )),
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error(`Failed to send ${type} email to ${email}`);
    }
  }

  // 🎨 OTP Template
  private generateOtpHtmlTemplate(otp: string, organization: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${organization} - OTP Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #ff9800;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 22px;
          }
          .content {
            padding: 20px;
            text-align: center;
          }
          .otp {
            font-size: 36px;
            font-weight: bold;
            color: #ff9800;
            background-color: #fff3e0;
            padding: 10px 20px;
            border-radius: 5px;
            letter-spacing: 2px;
            display: inline-block;
          }
          .footer {
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">${organization} - Lost and Found</div>
          <div class="content">
            <p>To ensure your security, use this OTP:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for a limited time.</p>
          </div>
          <div class="footer">
            Need help? Contact <a href="mailto:adevadiga2005@gmail.com">adevadiga2005@gmail.com</a>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // ✉️ Default Feedback Template (admin view)
  private defaultFeedbackTemplate(name: string, email: string, subject: string, message: string) {
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #f9f9f9; padding: 20px; color: #333; }
            .card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            blockquote { border-left: 4px solid #ccc; padding-left: 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>📬 New Feedback</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote>${message}</blockquote>
          </div>
        </body>
      </html>
    `;
  }

  // 🎉 Default Thank You Template (user)
  private defaultThankYouTemplate(name: string) {
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', sans-serif; background: #fffbe6; padding: 30px; }
            .thank-box {
              background: #fff;
              border-radius: 10px;
              padding: 30px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 { color: #007BFF; }
          </style>
        </head>
        <body>
          <div class="thank-box">
            <h1>🎉 Thank You!</h1>
            <p>Hey <strong>${name}</strong>,</p>
            <p>We appreciate your feedback! Our team will get back to you shortly.</p>
            <p style="color:gray;">— Void team support</p>
          </div>
        </body>
      </html>
    `;
  }
}

export default SendMailController;
