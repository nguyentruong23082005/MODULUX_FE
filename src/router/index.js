import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/client/WebLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('@/views/client/Home.vue') },
      { path: 'about', name: 'About', component: () => import('@/views/client/About.vue') },
      { path: 'contact', name: 'PublicContact', component: () => import('@/views/client/Contact.vue') },
      { path: 'enquire-now', name: 'EnquireNow', component: () => import('@/views/client/Contact.vue') },
      { path: 'faqs', name: 'Faqs', component: () => import('@/views/client/Faqs.vue') },
      { path: 'our-process', name: 'OurProcess', component: () => import('@/views/client/Process.vue') },
      { path: 'our-technology', name: 'OurTechnology', component: () => import('@/views/client/OurTechnology.vue') },
      {
        path: 'technical-specification',
        name: 'TechnicalSpecification',
        component: () => import('@/views/client/TechnicalSpecification.vue'),
      },
      { path: 'why-modulux', name: 'WhyModulux', component: () => import('@/views/client/WhyModulux.vue') },
      { path: 'blogs', name: 'PublicBlogs', component: () => import('@/views/client/BlogsPublic.vue') },
      { path: 'blogs/:slug', name: 'BlogDetail', component: () => import('@/views/client/BlogDetail.vue') },
      { path: 'projects', name: 'ProjectsPublic', component: () => import('@/views/client/ProjectsPublic.vue') },
      { path: 'projects/:id', name: 'ProjectDetail', component: () => import('@/views/client/ProjectDetail.vue') },

      // Backward-compatible aliases from old draft
      { path: 'what-we-do', redirect: '/why-modulux' },
      { path: 'process', redirect: '/our-process' },
    ],
  },



  {
    path: '/admin/login',
    name: 'Login',
    meta: { title: 'Sign In' },
    component: () => import('@/views/admin/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/CMSLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', meta: { title: 'Dashboard' }, component: () => import('@/views/admin/Dashboard.vue') },
      { path: 'projects', name: 'AdminProjects', meta: { title: 'Projects' }, component: () => import('@/views/admin/Projects.vue') },
      { path: 'blogs', name: 'AdminBlogs', meta: { title: 'Blogs' }, component: () => import('@/views/admin/Blogs.vue') },
      { path: 'pages', name: 'AdminPages', meta: { title: 'Pages' }, component: () => import('@/views/admin/Pages.vue') },
      { path: 'videos', name: 'AdminVideos', meta: { title: 'FQAs & Video' }, component: () => import('@/views/admin/Videos.vue') },
      { path: 'banners', name: 'AdminBanners', meta: { title: 'Hero Banners' }, component: () => import('@/views/admin/Banners.vue') },
      { path: 'features', name: 'AdminFeatures', meta: { title: 'Features' }, component: () => import('@/views/admin/Features.vue') },
      { path: 'partners', name: 'AdminPartners', meta: { title: 'Partners' }, component: () => import('@/views/admin/Partners.vue') },
      { path: 'contacts', name: 'AdminContacts', meta: { title: 'Enquiries' }, component: () => import('@/views/admin/Contacts.vue') },
      { path: 'subscribers', name: 'AdminSubscribers', meta: { title: 'Subscribers' }, component: () => import('@/views/admin/Subscribers.vue') },
      { path: 'navigation', name: 'AdminNavigation', meta: { title: 'Navigation' }, component: () => import('@/views/admin/Navigation.vue') },
      { path: 'settings', name: 'AdminSettings', meta: { title: 'Site Settings' }, component: () => import('@/views/admin/Settings.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.path === from.path && to.path === '/blogs') {
      return false
    }

    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('cms_token')
  if (to.meta.requiresAuth && !token) next('/admin/login')
  else next()
})

export default router

