import { insertOTP, getLatestOTP, deleteOTP, incrementAttempts } from '../models/otpModel';
import generateOTP from '../utils/generateOTP';

const validityPeriodMs = parseInt(process.env.OTP_VALIDITY_PERIOD_MINUTES || '5') * 60 * 1000;
const OTP_SIZE = parseInt(process.env.OTP_SIZE || '6');
const MAX_ATTEMPTS = 3;

class OtpController {
  async generateOtp(email: string, type: string): Promise<string> {
    try {
      const now = Date.now();

      const existingOtp = getLatestOTP(email);
      if (existingOtp && now - new Date(existingOtp.createdAt).getTime() <= validityPeriodMs) {
        if (existingOtp.attempts >= MAX_ATTEMPTS) {
          throw new Error('Maximum attempts reached. Try again later.');
        }
        incrementAttempts(existingOtp.id);
        return existingOtp.otp;
      }

      const otp = generateOTP(OTP_SIZE, type);
      insertOTP(email, otp);

      return otp;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    try {
      if (!otp || otp.length !== OTP_SIZE) {
        throw new Error('Invalid OTP');
      }

      const existingOtp = getLatestOTP(email);
      if (
        existingOtp &&
        existingOtp.otp === otp &&
        Date.now() - new Date(existingOtp.createdAt).getTime() <= validityPeriodMs
      ) {
        deleteOTP(existingOtp.id);
        return true;
      }

      throw new Error('Invalid OTP');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default OtpController;
