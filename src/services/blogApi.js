import api from './api'
import publicApi from './publicApi'

const unwrap = (promise) => promise.then((response) => response.data)

export const getBlogs = (params = {}) => unwrap(publicApi.get('/api/v1/blogs/', { params }))
export const getBlogDetail = (slug) => unwrap(publicApi.get(`/api/v1/blogs/${slug}`))
export const getAdminBlogDetail = (blogId) => unwrap(api.get(`/api/v1/admin/blogs/${blogId}`))
export const deleteBlog = (blogId) => api.delete(`/api/v1/admin/blogs/${blogId}`)
export const triggerBlogSync = () => unwrap(api.post('/api/v1/admin/sync'))
export const getBlogSyncLogs = (limit = 20) => unwrap(api.get('/api/v1/admin/sync/logs', { params: { limit } }))
export const updateBlogType = (blogId, type) => unwrap(api.patch(`/api/v1/admin/blogs/${blogId}/type`, { type }))
export const importBlogExcel = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return unwrap(api.post('/api/v1/admin/import-excel', formData))
}
export const importBlogUrl = (url) => unwrap(api.post('/api/v1/admin/import-url', { url }))

export default {
  getBlogs,
  getBlogDetail,
  getAdminBlogDetail,
  deleteBlog,
  triggerBlogSync,
  getBlogSyncLogs,
  updateBlogType,
  importBlogExcel,
  importBlogUrl,
}
