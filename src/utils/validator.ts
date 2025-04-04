export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domain] = email.split("@");
  
    const allowedDomains = process.env.ALLOWED_DOMAINS?.split(",") || [];
    const minLocalPartLength = 5;
    const maxLocalPartLength = 64;
  
    const isDomainAllowed = allowedDomains.length === 0 || allowedDomains.includes(domain);
    const isLengthValid = localPart.length >= minLocalPartLength && localPart.length <= maxLocalPartLength;
    const isFormatValid = emailRegex.test(email);
  
    return isDomainAllowed && isLengthValid && isFormatValid;
  };
  