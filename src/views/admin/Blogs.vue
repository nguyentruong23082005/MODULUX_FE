<template>
  <div class="space-y-8">
    <section class="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] lg:p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Blog Sync</p>
        <h2 class="mt-3 text-3xl font-semibold text-slate-950">External Blog Control</h2>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Trigger sync from the production source, import blog URLs from Excel, review sync history, and inspect the normalized blog data served by this CMS.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="syncing || importing"
            @click="handleSync"
          >
            {{ syncing ? 'Syncing...' : 'Sync Now' }}
          </button>

          <label class="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
            <input type="file" accept=".xlsx" class="hidden" @change="onFileChange" />
            {{ selectedFile ? selectedFile.name : 'Choose Excel' }}
          </label>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!selectedFile || syncing || importing"
            @click="handleImport"
          >
            {{ importing ? 'Importing...' : 'Import Excel' }}
          </button>
        </div>

        <p v-if="actionMessage" class="mt-4 text-sm" :class="actionError ? 'text-rose-600' : 'text-emerald-700'">
          {{ actionMessage }}
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        <article class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Latest Run</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{{ latestSummary.total }}</p>
          <p class="mt-2 text-sm text-slate-500">Total processed</p>
        </article>
        <article class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Inserted</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{{ latestSummary.inserted }}</p>
          <p class="mt-2 text-sm text-slate-500">New blogs created</p>
        </article>
        <article class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Updated</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{{ latestSummary.updated }}</p>
          <p class="mt-2 text-sm text-slate-500">Existing blogs refreshed</p>
        </article>
        <article class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)]">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Skipped</p>
          <p class="mt-3 text-3xl font-semibold text-slate-950">{{ latestSummary.skipped }}</p>
          <p class="mt-2 text-sm text-slate-500">No content changes detected</p>
        </article>
      </div>
    </section>

    <section class="grid gap-8 xl:grid-cols-[1.45fr_1fr]">
      <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] lg:p-8">
        <div class="flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Stored Blogs</p>
            <h3 class="mt-2 text-2xl font-semibold text-slate-950">Normalized content</h3>
          </div>
          <button
            type="button"
            class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            @click="fetchBlogs(currentPage)"
          >
            Refresh
          </button>
        </div>

        <div v-if="blogsLoading" class="space-y-3 pt-6">
          <div v-for="n in 5" :key="n" class="h-20 animate-pulse rounded-2xl bg-slate-100"></div>
        </div>

        <div v-else-if="blogs.length === 0" class="pt-6 text-sm text-slate-500">No blogs have been synced yet.</div>

        <div v-else class="space-y-4 pt-6">
          <article v-for="blog in blogs" :key="blog.id" class="rounded-[24px] border border-slate-200 p-5 transition hover:border-slate-300 hover:bg-slate-50/60">
            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{{ formatDate(blog.updated_at) }}</p>
                <h4 class="mt-2 text-lg font-semibold text-slate-950">{{ blog.title }}</h4>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {{ blog.type }}
                  </span>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                    :class="blog.is_type_overridden ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'"
                  >
                    {{ blog.is_type_overridden ? 'Manual type' : 'Source type' }}
                  </span>
                </div>
                <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{{ blog.excerpt }}</p>
                <a :href="blog.source_url" target="_blank" rel="noreferrer" class="mt-3 inline-flex max-w-full items-center gap-2 truncate text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
                  {{ blog.source_url }}
                </a>
              </div>
              <img v-if="blog.image_url" :src="blog.image_url" :alt="blog.title" class="h-24 w-full rounded-2xl border border-slate-200 object-cover md:w-40" />
            </div>
            <div class="mt-4 grid gap-3 xl:grid-cols-[minmax(0,240px)_auto_auto_1fr] xl:items-center">
              <label class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                News Type
                <select
                  v-model="typeDrafts[blog.id]"
                  class="mt-2 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  :disabled="Boolean(typeSaving[blog.id])"
                >
                  <option v-for="type in BLOG_TYPES" :key="type" :value="type">{{ type }}</option>
                </select>
              </label>

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="Boolean(typeSaving[blog.id]) || !hasTypeChanged(blog)"
                @click="saveBlogType(blog)"
              >
                {{ typeSaving[blog.id] ? 'Saving...' : 'Save type' }}
              </button>

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="Boolean(typeSaving[blog.id]) || !blog.is_type_overridden"
                @click="resetBlogType(blog)"
              >
                Use source
              </button>

              <p class="text-xs text-slate-500 xl:text-right">
                Source: {{ blog.source_type }}
              </p>
            </div>
            <div class="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
              <span class="rounded-full bg-slate-100 px-3 py-1">Slug: {{ blog.slug }}</span>
              <span class="rounded-full bg-slate-100 px-3 py-1">Last synced: {{ formatDateTime(blog.last_synced_at) }}</span>
            </div>
          </article>
        </div>

        <div v-if="pagination.total_pages > 1" class="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
          <p class="text-sm text-slate-500">Page {{ pagination.page }} of {{ pagination.total_pages }}</p>
          <div class="flex gap-3">
            <button
              type="button"
              class="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="pagination.page <= 1"
              @click="fetchBlogs(pagination.page - 1)"
            >
              Previous
            </button>
            <button
              type="button"
              class="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="pagination.page >= pagination.total_pages"
              @click="fetchBlogs(pagination.page + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] lg:p-8">
        <div class="border-b border-slate-200 pb-5">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Sync Logs</p>
          <h3 class="mt-2 text-2xl font-semibold text-slate-950">Recent history</h3>
        </div>

        <div v-if="logsLoading" class="space-y-3 pt-6">
          <div v-for="n in 5" :key="n" class="h-16 animate-pulse rounded-2xl bg-slate-100"></div>
        </div>

        <div v-else-if="syncLogs.length === 0" class="pt-6 text-sm text-slate-500">No sync logs available.</div>

        <div v-else class="space-y-4 pt-6">
          <article v-for="log in syncLogs" :key="log.id" class="rounded-[24px] border border-slate-200 p-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{{ log.type }}</p>
                <p class="mt-2 text-sm font-semibold text-slate-950">{{ formatDateTime(log.created_at) }}</p>
              </div>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{{ log.total }} total</span>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div class="rounded-2xl bg-emerald-50 px-3 py-3 text-emerald-700">
                <div class="text-lg font-semibold">{{ log.inserted }}</div>
                <div class="text-xs uppercase tracking-[0.18em]">Inserted</div>
              </div>
              <div class="rounded-2xl bg-amber-50 px-3 py-3 text-amber-700">
                <div class="text-lg font-semibold">{{ log.updated }}</div>
                <div class="text-xs uppercase tracking-[0.18em]">Updated</div>
              </div>
              <div class="rounded-2xl bg-slate-100 px-3 py-3 text-slate-700">
                <div class="text-lg font-semibold">{{ log.skipped }}</div>
                <div class="text-xs uppercase tracking-[0.18em]">Skipped</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getBlogs, getBlogSyncLogs, importBlogExcel, triggerBlogSync, updateBlogType } from '@/services/blogApi'

const BLOG_TYPES = Object.freeze(['DESIGN INSPIRATION', 'FEATURED', 'BUILDING', 'PROJECTS'])

const blogs = ref([])
const syncLogs = ref([])
const selectedFile = ref(null)
const syncing = ref(false)
const importing = ref(false)
const blogsLoading = ref(true)
const logsLoading = ref(true)
const actionMessage = ref('')
const actionError = ref(false)
const currentPage = ref(1)
const pagination = ref({ page: 1, page_size: 8, total: 0, total_pages: 0 })
const typeDrafts = ref({})
const typeSaving = ref({})

const latestLog = computed(() => syncLogs.value[0] || null)
const latestSummary = computed(() => latestLog.value || { total: 0, inserted: 0, updated: 0, skipped: 0 })

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const fetchBlogs = async (page = 1) => {
  blogsLoading.value = true
  try {
    const data = await getBlogs({ page, page_size: pagination.value.page_size })
    blogs.value = data.items
    typeDrafts.value = data.items.reduce((accumulator, blog) => {
      accumulator[blog.id] = blog.type
      return accumulator
    }, {})
    pagination.value = {
      page: data.page,
      page_size: data.page_size,
      total: data.total,
      total_pages: data.total_pages,
    }
    currentPage.value = data.page
  } catch (err) {
    actionMessage.value = err.response?.data?.detail || 'Failed to load blogs.'
    actionError.value = true
  } finally {
    blogsLoading.value = false
  }
}

const hasTypeChanged = (blog) => (typeDrafts.value[blog.id] || blog.type) !== blog.type

const applyTypeUpdate = (blogId, payload) => {
  const target = blogs.value.find((blog) => blog.id === blogId)
  if (!target) return
  target.type = payload.type
  target.source_type = payload.source_type
  target.type_override = payload.type_override
  target.is_type_overridden = payload.is_type_overridden
  typeDrafts.value[blogId] = payload.type
}

const saveBlogType = async (blog) => {
  typeSaving.value = { ...typeSaving.value, [blog.id]: true }
  actionMessage.value = ''
  actionError.value = false

  try {
    const payload = await updateBlogType(blog.id, typeDrafts.value[blog.id])
    applyTypeUpdate(blog.id, payload)
    actionMessage.value = `Updated news type for "${blog.title}".`
  } catch (err) {
    actionMessage.value = err.response?.data?.detail || 'Failed to update news type.'
    actionError.value = true
    typeDrafts.value[blog.id] = blog.type
  } finally {
    typeSaving.value = { ...typeSaving.value, [blog.id]: false }
  }
}

const resetBlogType = async (blog) => {
  typeSaving.value = { ...typeSaving.value, [blog.id]: true }
  actionMessage.value = ''
  actionError.value = false

  try {
    const payload = await updateBlogType(blog.id, null)
    applyTypeUpdate(blog.id, payload)
    actionMessage.value = `Reverted "${blog.title}" to source type.`
  } catch (err) {
    actionMessage.value = err.response?.data?.detail || 'Failed to reset news type.'
    actionError.value = true
    typeDrafts.value[blog.id] = blog.type
  } finally {
    typeSaving.value = { ...typeSaving.value, [blog.id]: false }
  }
}

const fetchLogs = async () => {
  logsLoading.value = true
  try {
    syncLogs.value = await getBlogSyncLogs(10)
  } catch (err) {
    actionMessage.value = err.response?.data?.detail || 'Failed to load sync logs.'
    actionError.value = true
  } finally {
    logsLoading.value = false
  }
}

const waitForLogAfter = async (startedAt) => {
  const startedMs = new Date(startedAt).getTime()
  for (let attempt = 0; attempt < 45; attempt += 1) {
    await sleep(2000)
    await fetchLogs()
    const latest = syncLogs.value[0]
    if (latest && new Date(latest.created_at).getTime() >= startedMs) {
      await fetchBlogs(currentPage.value)
      syncing.value = false
      actionMessage.value = 'Blog sync completed.'
      actionError.value = false
      return
    }
  }

  syncing.value = false
  actionMessage.value = 'Sync started, but the latest log did not arrive within the polling window.'
  actionError.value = true
}

const handleSync = async () => {
  syncing.value = true
  actionMessage.value = ''
  actionError.value = false

  try {
    const result = await triggerBlogSync()
    actionMessage.value = 'Sync job queued. Waiting for result...'
    await waitForLogAfter(result.started_at)
  } catch (err) {
    syncing.value = false
    actionMessage.value = err.response?.data?.detail || 'Failed to start sync.'
    actionError.value = true
  }
}

const onFileChange = (event) => {
  const [file] = event.target.files || []
  selectedFile.value = file || null
}

const handleImport = async () => {
  if (!selectedFile.value) return

  importing.value = true
  actionMessage.value = ''
  actionError.value = false

  try {
    const summary = await importBlogExcel(selectedFile.value)
    actionMessage.value = `Import completed. Inserted ${summary.inserted}, updated ${summary.updated}, skipped ${summary.skipped}.`
    actionError.value = false
    selectedFile.value = null
    await Promise.all([fetchLogs(), fetchBlogs(currentPage.value)])
  } catch (err) {
    actionMessage.value = err.response?.data?.detail || 'Failed to import Excel file.'
    actionError.value = true
  } finally {
    importing.value = false
  }
}

const formatDate = (value) => {
  if (!value) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

const formatDateTime = (value) => {
  if (!value) return 'Unknown'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

onMounted(async () => {
  await Promise.all([fetchBlogs(1), fetchLogs()])
})
</script>
