import crypto from 'crypto';

// Hash PII data according to Facebook specs
export function hashEmail(email: string): string {
  return crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex');
}

export function hashPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '').trim();
  return crypto
    .createHash('sha256')
    .update(cleaned)
    .digest('hex');
}

export function hashFirstName(name: string): string {
  return crypto
    .createHash('sha256')
    .update(name.toLowerCase().trim())
    .digest('hex');
}

export function hashLastName(name: string): string {
  return crypto
    .createHash('sha256')
    .update(name.toLowerCase().trim())
    .digest('hex');
}

export function hashCity(city: string): string {
  return crypto
    .createHash('sha256')
    .update(city.toLowerCase().trim().replace(/\s/g, ''))
    .digest('hex');
}

export function hashState(state: string): string {
  return crypto
    .createHash('sha256')
    .update(state.toLowerCase().trim().replace(/\s/g, ''))
    .digest('hex');
}

export function hashCountry(country: string): string {
  return crypto
    .createHash('sha256')
    .update(country.toLowerCase().trim().replace(/\s/g, ''))
    .digest('hex');
}

// Extract first and last name from full name
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}
