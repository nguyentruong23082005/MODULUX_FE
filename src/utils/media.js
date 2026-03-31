const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

export function resolveMediaUrl(url) {
  if (!url) return ''
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url
  }
  if (url.startsWith('/')) {
    return url
  }
  return API_BASE_URL ? `${API_BASE_URL}/${url}` : `/${url}`
}
