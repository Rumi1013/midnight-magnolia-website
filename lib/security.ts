// Security utilities for the application

export function sanitizeInput(input: string, maxLength = 255): string {
  if (typeof input !== "string") return ""
  return input.trim().substring(0, maxLength)
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validateSessionId(sessionId: string): boolean {
  if (typeof sessionId !== "string") return false
  return /^cs_[a-zA-Z0-9_]+$/.test(sessionId)
}

export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (typeof data !== "string" || data.length <= visibleChars) return "***"
  return "***" + data.slice(-visibleChars)
}

export function validatePrice(price: any): boolean {
  return typeof price === "number" && price > 0 && price <= 10000 && Number.isFinite(price)
}

export function validateId(id: any): boolean {
  return typeof id === "number" && Number.isInteger(id) && id > 0
}
