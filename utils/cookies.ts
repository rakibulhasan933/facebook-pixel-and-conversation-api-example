/**
 * Utility function to get cookie values from the browser
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null
  }

  const nameEQ = name + "="
  const cookies = document.cookie.split(";")

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * Utility function to set cookie values
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === "undefined") {
    return
  }

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}
