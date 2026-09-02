/**
 * Validates whether a phone number is a valid 10-digit Indian mobile number
 * @param {string} phone
 * @returns {{ isValid: boolean, cleaned: string, error: string | null }}
 */
export const validateIndianMobile = (phone) => {
  if (!phone || !phone.trim()) {
    return { isValid: false, cleaned: '', error: 'Mobile number is required' };
  }
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) {
    return { 
      isValid: false, 
      cleaned, 
      error: `Please enter a 10-digit mobile number (currently ${cleaned.length} digits)` 
    };
  }
  if (!/^[6-9]/.test(cleaned)) {
    return { 
      isValid: false, 
      cleaned, 
      error: 'Please enter a valid mobile number starting with 6, 7, 8, or 9' 
    };
  }
  return { isValid: true, cleaned, error: null };
};

/**
 * Sanitizes user input to only accept numeric digits up to 10 characters
 * @param {string} val
 * @returns {string}
 */
export const sanitizePhoneInput = (val) => {
  if (!val) return '';
  return val.replace(/\D/g, '').slice(0, 10);
};
