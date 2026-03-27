# Bố cục Trang Home — Modulux Homes (Vue.js)

## Thứ tự Sections (theo trang gốc)

```
1. HeroSection        — Full-screen banner (API CMS)
2. AboutSection       — 2 cột: tiêu đề + "24 years" typography
3. FeaturedProjects   — 2 cột: tiêu đề trái + grid dự án phải
4. KeyFeatures        — 2 cột: intro trái + 2×2 feature cards
5. PartnersSection    — Logo track đối tác
6. FactoryVideo       — 2 cột: text + video/image
7. GeneralEnquiry     — CTA banner nền xanh
8. NewsSection        — Grid 3 cột blog posts
```

## Cấu trúc File

```
src/
├── views/client/Home.vue                    ← Trang chính
├── components/client/home/
│   ├── HeroSection.vue                      ← Hero full-screen
│   ├── AboutSection.vue                     ← About Us 2 cột
│   ├── FeaturedProjects.vue                 ← Feature Projects
│   ├── KeyFeatures.vue                      ← Key Features 2×2
│   ├── PartnersSection.vue                  ← Partners logo track
│   ├── FactoryVideo.vue                     ← Factory video tour
│   ├── GeneralEnquiry.vue                   ← CTA enquiry banner
│   └── NewsSection.vue                      ← News/Blog grid
├── components/client/
│   ├── Navbar.vue                           ← Sticky header (API)
│   └── Footer.vue                           ← Footer 4 cột
└── data/mockContent.js                      ← Mock data
```

## Nguồn Dữ liệu

| Section           | Nguồn          | Ghi chú                            |
|-------------------|----------------|-------------------------------------|
| Navbar            | **API CMS**    | `/api/v1/site/menu` — đã gắn       |
| Hero Banner       | **API CMS**    | `/api/v1/site/banners` + fallback   |
| About Us          | Mock (tĩnh)   | Hardcode typography "24 years"      |
| Feature Projects  | Mock           | `mockContent.projects`              |
| Key Features      | Mock           | Inline trong Home.vue               |
| Partners          | Mock           | `mockContent.partnerNames`          |
| Factory Video     | Mock (tĩnh)   | Ảnh + link YouTube                  |
| General Enquiry   | Mock (tĩnh)   | Hardcode text                       |
| News / Blog       | Mock           | `mockContent.posts`                 |
| Footer            | Mock (tĩnh)   | Hardcode                            |

## Responsive Breakpoints

- **Mobile**: `< 640px` (1 cột)
- **Tablet**: `640px – 1023px` (2 cột)
- **Desktop**: `≥ 1024px` (layout gốc đầy đủ)

## Animation

- **AOS (Animate On Scroll)** — `fade-up`, `fade-right`, `fade-left`, `zoom-in`
- **Hover**: card zoom ảnh (`scale 1.04`), button chuyển nền, link dịch mũi tên
- **Transition**: `0.3s – 0.5s ease`
