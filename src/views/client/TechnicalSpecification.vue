<template>
  <div class="tech-spec-page">
    <section class="tech-spec-hero">
      <div class="tech-spec-hero__bg">
        <img src="/images/home/nen.avif" alt="Technical Specification" loading="lazy" />
      </div>
      <div class="tech-spec-hero__overlay"></div>

      <div class="container-custom tech-spec-hero__inner">
        <h1 data-aos="fade-up" data-aos-offset="20" data-aos-delay="50">Technical Specification</h1>
      </div>
    </section>

    <section class="tech-spec-content">
      <div class="container-custom">
        <div class="tech-spec-divider" data-aos="fade-up" data-aos-offset="20" data-aos-delay="50"></div>

        <div class="tech-spec-accordion">
          <article
            v-for="(item, idx) in specItems"
            :key="item.question"
            class="tech-spec-item"
            data-aos="fade-up"
            data-aos-offset="20"
            data-aos-delay="50"
          >
            <button
              type="button"
              class="tech-spec-item__trigger"
              :aria-expanded="openIndex === idx"
              @click="toggleItem(idx)"
            >
              <span class="tech-spec-item__title">{{ item.question }}</span>
              <span class="tech-spec-item__icon" aria-hidden="true">
                <svg v-if="openIndex === idx" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>

            <div
              :ref="(el) => setContentRef(el, idx)"
              class="tech-spec-item__panel"
              :style="panelStyle(idx)"
            >
              <div class="tech-spec-item__body">
                <p v-for="(line, lineIdx) in item.lines" :key="`${item.question}-${lineIdx}`" class="tech-spec-item__line">
                  <span class="tech-spec-item__bullet"></span>
                  <span>{{ line }}</span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const specItems = [
  {
    question: 'Structural Frame',
    lines: [
      'Wall, ceiling, roof and floor: light-gauge steel frame, steel grade Fy=50 KSI, with from Z80 to Z120 galvanized coating.',
      'Floor: hot dip galvanized I-beam steel frame (for block solution only).',
    ],
  },
  {
    question: 'Roof Finishing',
    lines: [
      'Option 1: Metal roofing, gray-colored (waterproofing membrane/roof felt/reflective foil insulation + wood batten + metal roof).',
      'Option 2: Asphalt shingle roofing: 18mm thick OSB board + waterproofing membrane/roof felt/reflective foil insulation + asphalt roof finish.',
      'Option 3: TPO/EPDM roofing: 18mm thick OSB board + waterproofing membrane + TPO/EPDM roof.',
      'Note: TPO/EPDM roof is only used for flat roof.',
    ],
  },
  {
    question: 'Ceiling Finishing',
    lines: [
      'Outdoor ceiling: New Zealand Radiata Pine wood, finished as specified.',
      'Indoor ceiling: Knauf Fireshield 12.7mm (1/2 inch) gypsum board, painted with Dulux Maxilite Total Super White or covered with ceiling wallpaper (optional).',
    ],
  },
  {
    question: 'Wall Finishing',
    lines: [
      'Exterior walls: 16mm thick New Zealand Radiata Pine wood, finished as specified.',
      'Interior walls: 9mm thick New Zealand Radiata Pine wood, finished as specified/painted or covered with wallpaper (optional).',
      'Bathroom walls: 2.8mm thick Kosmos PVC panel - White Marble.',
    ],
  },
  {
    question: 'Insulation',
    lines: [
      'Rigid continuous insulation (Kingspan or equivalent).',
      'Batt cavity insulation (Rockwool/CertainTeed/Owen Corning or equivalent).',
    ],
  },
  {
    question: 'Door Finishing',
    lines: [
      'Exterior doors: Roto-i aluminum frame, powder gray coating, double-glazed Low-E glass with Argon gas in between (24mm thickness).',
      'Interior/entry doors: thermo-treated pine wood, finished as specified, with Hafele or equivalent accessories as required.',
    ],
  },
  {
    question: 'Floor Finishing',
    lines: [
      'Indoor flooring: vinyl flooring or equivalent.',
      'Decking outside: H-grade/thermo-treated pine wood, finished as specified.',
    ],
  },
  {
    question: 'Covered Entry Porch / Pagoda / Trellis Above Decking Outside',
    lines: [
      'H-grade/thermo-treated pine wood, finished as specified, or glulam/CLT structure assembly (optional).',
    ],
  },
  {
    question: 'Mechanical, Electrical, and Plumbing (MEP)',
    lines: [
      'Includes embedded pipes and concealed wiring within walls.',
      'Includes basic terminal devices: electrical cabinet, lights, switches, and standard outlets (excluding water heaters, air conditioners, or decorative lights).',
    ],
  },
]

const openIndex = ref(-1)
const contentRefs = ref([])
const contentHeights = ref([])

const setContentRef = (el, idx) => {
  if (el) {
    contentRefs.value[idx] = el
  }
}

const measureHeights = async () => {
  await nextTick()
  contentHeights.value = specItems.map((_, idx) => {
    const el = contentRefs.value[idx]
    return el ? el.scrollHeight : 0
  })
}

const panelStyle = (idx) => ({
  height: openIndex.value === idx ? `${contentHeights.value[idx] || 0}px` : '0px',
})

const toggleItem = async (idx) => {
  openIndex.value = openIndex.value === idx ? -1 : idx
  await measureHeights()
}

let resizeTimer = null
const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    measureHeights()
  }, 180)
}

onMounted(async () => {
  await measureHeights()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimer)
})
</script>

<style scoped>
.tech-spec-page {
  background: #ffffff;
  padding-top: 80px;
}

.tech-spec-hero {
  position: relative;
  overflow: hidden;
  min-height: 240px;
}

.tech-spec-hero__bg,
.tech-spec-hero__overlay {
  position: absolute;
  inset: 0;
}

.tech-spec-hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-spec-hero__overlay {
  background: linear-gradient(90deg, rgba(10, 17, 28, 0.78) 0%, rgba(10, 17, 28, 0.56) 52%, rgba(10, 17, 28, 0.38) 100%);
}

.tech-spec-hero__inner {
  position: relative;
  z-index: 1;
  min-height: 240px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 1.1rem;
}

.tech-spec-hero__inner h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
}

.tech-spec-content {
  padding: 1.3rem 0 2.6rem;
}

.tech-spec-divider {
  width: 100%;
  height: 1px;
  background: #101010;
}

.tech-spec-accordion {
  margin-top: 0.1rem;
}

.tech-spec-item {
  border-bottom: 1px solid #101010;
}

.tech-spec-item__trigger {
  width: 100%;
  border: none;
  background: #ffffff;
  padding: 0.82rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  text-align: left;
}

.tech-spec-item__title {
  color: #101214;
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.2;
}

.tech-spec-item__icon {
  width: 31px;
  height: 31px;
  color: #111111;
  flex-shrink: 0;
}

.tech-spec-item__icon svg {
  width: 100%;
  height: 100%;
}

.tech-spec-item__panel {
  overflow: hidden;
  transition: height 0.45s ease;
}

.tech-spec-item__body {
  padding: 0 0 0.9rem;
}

.tech-spec-item__line {
  margin: 0.36rem 0 0;
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  color: #3f454d;
  font-size: 0.94rem;
  line-height: 1.72;
}

.tech-spec-item__bullet {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #555b62;
  margin-top: 0.53rem;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .tech-spec-hero,
  .tech-spec-hero__inner {
    min-height: 300px;
  }

  .tech-spec-content {
    padding-top: 1.5rem;
    padding-bottom: 2.9rem;
  }

  .tech-spec-item__trigger {
    padding-top: 0.86rem;
    padding-bottom: 0.86rem;
  }

  .tech-spec-item__body {
    padding-bottom: 1rem;
  }

  .tech-spec-item__line {
    font-size: 0.96rem;
  }
}
</style>
