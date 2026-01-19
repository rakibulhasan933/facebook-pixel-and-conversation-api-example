import crypto from 'crypto';

export function sha256(value: string): string {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase(), "utf8")
    .digest("hex")
}

export function hashName(name?: string): string | undefined {
  if (!name) return undefined
  return sha256(name)
}

/**
 * City / State / ZIP / Country hashing
 */
export function hashLocation(value?: string): string | undefined {
  if (!value) return undefined
  return sha256(value)
}

export function hashGender(gender?: string): string | undefined {
  if (!gender) return undefined

  const g = gender.toLowerCase()
  if (g === "male" || g === "m") return sha256("m")
  if (g === "female" || g === "f") return sha256("f")

  return undefined
}

export function hashExternalId(id?: string): string | undefined {
  if (!id) return undefined
  return sha256(id)
}

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

export function hashDateOfBirth(dateString: string): string {
  // Format: YYYYMMDD
  if (!dateString) return '';
  const cleaned = dateString.replace(/-/g, '');
  return crypto
    .createHash('sha256')
    .update(cleaned)
    .digest('hex');
}

// Extract first and last name from full name
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}
