import { Request, Response, NextFunction } from 'express';
import { isValidEmail } from '../utils/validator';


const spamWords = new Set(
  process.env.BLOCK_KEYWORDS_RULES?.split(',').map((word) => word.toLowerCase().trim()) || []
);

export const validateSpamMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, ...rest } = req.body;
    const bodyText = Object.values(rest).join(' ').toLowerCase();

    for (const word of spamWords) {
      if (bodyText.includes(word)) {
        res.status(400).json({ error: 'Spam detected' });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  if (!isValidEmail(req.body.email)) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  next();
};
