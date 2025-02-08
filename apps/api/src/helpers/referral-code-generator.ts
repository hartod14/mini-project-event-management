export function generateReferralCode(): string {
    // implement logic to generate a unique referral code
    return 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }