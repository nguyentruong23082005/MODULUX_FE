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

/**
 * Lấy ảnh đại diện cho project, ưu tiên ảnh local từ mảng images
 * thay vì thumbnail_url (có thể là link CDN ngoại bị CORB chặn).
 *
 * Thứ tự ưu tiên:
 *  1. Ảnh hero (is_hero === true) trong mảng images
 *  2. Ảnh đầu tiên trong mảng images
 *  3. thumbnail_url nếu là đường dẫn local (bắt đầu bằng /)
 *  4. fallback image
 */
export function getProjectCardImage(project, fallbackImage = '/images/project-placeholder.jpg') {
  const heroImg = project.images?.find((img) => img.is_hero)?.image_url
  if (heroImg) return resolveMediaUrl(heroImg)

  const firstImg = project.images?.[0]?.image_url
  if (firstImg) return resolveMediaUrl(firstImg)

  if (project.thumbnail_url && project.thumbnail_url.startsWith('/')) {
    return project.thumbnail_url
  }

  return fallbackImage
}
