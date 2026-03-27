import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('cms_token') || null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      try {
        const response = await api.post('/api/v1/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        const token = response.data.access_token
        this.token = token
        localStorage.setItem('cms_token', token)

        await this.fetchUser()
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const response = await api.get('/api/v1/users/me')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user:', error)
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('cms_token')
    },
  },
})
