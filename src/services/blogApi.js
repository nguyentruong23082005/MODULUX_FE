import api from './api'
import publicApi from './publicApi'

const unwrap = (promise) => promise.then((response) => response.data)

export const getBlogs = (params = {}) => unwrap(publicApi.get('/api/v1/blogs/', { params }))
export const getBlogDetail = (slug) => unwrap(publicApi.get(`/api/v1/blogs/${slug}`))
export const triggerBlogSync = () => unwrap(api.post('/api/v1/admin/sync'))
export const getBlogSyncLogs = (limit = 20) => unwrap(api.get('/api/v1/admin/sync/logs', { params: { limit } }))
export const updateBlogType = (blogId, type) => unwrap(api.patch(`/api/v1/admin/blogs/${blogId}/type`, { type }))
export const importBlogExcel = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return unwrap(api.post('/api/v1/admin/import-excel', formData))
}

export default {
  getBlogs,
  getBlogDetail,
  triggerBlogSync,
  getBlogSyncLogs,
  updateBlogType,
  importBlogExcel,
}
