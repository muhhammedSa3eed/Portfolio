<template>
  <section id="github-stats" ref="statsRef" class="stats-section">
    <div class="container">
      <div class="header">
        <h2 class="title">GitHub Activity</h2>
        <p class="subtitle">My coding journey at a glance</p>
      </div>

      <div class="stats-grid">
        <!-- Contributions Graph -->
        <div class="stat-card contributions-card">
          <h3 class="card-title">
            <svg viewBox="0 0 16 16" fill="currentColor" class="icon">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
            Contributions
          </h3>
          <div class="contributions-wrapper">
            <img
              v-if="ready"
              :src="`https://ghchart.rshah.org/${
                isDark ? '' : '2196f3/'
              }${githubUsername}`"
              alt="GitHub Contributions"
              class="contributions-img"
            />
          </div>
        </div>

        <!-- GitHub Stats Card -->
        <div class="stat-card">
          <h3 class="card-title">
            <svg viewBox="0 0 16 16" fill="currentColor" class="icon">
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"
              />
            </svg>
            Statistics
          </h3>
          <img
            v-if="ready"
            :src="`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&bg_color=${
              isDark ? '00000000' : 'ffffff'
            }&title_color=${isDark ? 'ffa500' : '2563eb'}&icon_color=${
              isDark ? 'ffa500' : '2563eb'
            }&text_color=${isDark ? 'ffffff' : '000000'}&ring_color=${
              isDark ? 'ffa500' : '2563eb'
            }&t=${timestamp.value}`"
            alt="GitHub Stats"
            class="stats-img"
          />
        </div>

        <!-- Streak Stats -->
        <div class="stat-card">
          <h3 class="card-title">
            <svg viewBox="0 0 16 16" fill="currentColor" class="icon">
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            Streak
          </h3>
          <img
            v-if="ready"
            :src="`https://nirzak-streak-stats.vercel.app?user=${githubUsername}&hide_border=true&background=${
              isDark ? '00000000' : 'ffffff'
            }&ring=2563eb&fire=f97316&currStreakLabel=2563eb&dates=${
              isDark ? 'E5E7EB' : '6b7280'
            }&stroke=${isDark ? 'E5E7EB' : '9ca3af'}&sideNums=${
              isDark ? 'F3F4F6' : '1f2937'
            }&sideLabels=${isDark ? 'D1D5DB' : '4b5563'}&currStreakNum=${
              isDark ? 'FFFFFF' : '1f2937'
            }&t=${timestamp.value}`"
            alt="GitHub Streak"
            class="stats-img"
            loading="lazy"
            @error="handleStreakError"
          />
        </div>

        <!-- Top Languages -->
        <div class="stat-card">
          <h3 class="card-title">
            <svg viewBox="0 0 16 16" fill="currentColor" class="icon">
              <path
                d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            Top Languages
          </h3>
          <img
            v-if="ready"
            :src="`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&hide_border=true&hide_title=true&bg_color=${
              isDark ? '00000000' : 'ffffff'
            }&title_color=2563eb&text_color=${
              isDark ? 'ffffff' : '#000000'
            }&t=${timestamp.value}`"
            alt="Top Languages"
            class="stats-img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const statsRef = ref(null);
const githubUsername = "muhhammedSa3eed";
let observer = null;
let mutationObserver = null;

const isDark = ref(true);
const ready = ref(false);
const timestamp = ref(Date.now());

let refreshInterval = null;

const refreshStats = () => {
  timestamp.value = Date.now();
};

const updateIsDark = () => {
  if (typeof document !== "undefined") {
    isDark.value = !document.documentElement.classList.contains("light");
  }
};

const handleStreakError = (event) => {
  console.log("Streak stats loading failed, trying fallback...");
  event.target.src = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=${
    isDark.value ? "dark" : "light"
  }&hide_border=true&background=00000000&ring=${
    isDark.value ? "FFD700" : "667EEA"
  }&fire=${isDark.value ? "FFD700" : "764BA2"}`;
};

onMounted(() => {
  // Initial check
  updateIsDark();
  ready.value = true;

  // Set up MutationObserver to watch for class changes
  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        updateIsDark();
      }
    });
  });

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  if (statsRef.value) {
    observer.observe(statsRef.value);
  }

  // Auto-refresh stats every 5 minutes
  refreshInterval = setInterval(() => {
    refreshStats();
  }, 300000); // 5 minutes
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
  if (mutationObserver) mutationObserver.disconnect();
  if (refreshInterval) clearInterval(refreshInterval);
});
</script>

<style scoped>
.stats-section {
  padding: 80px 0;
  scroll-margin-top: 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--pikachu-yellow) 0%, #ffa500 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: rgb(209, 213, 219);
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transform: translateY(-5px);
}

.contributions-card {
  grid-column: 1 / -1;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  font-weight: normal;
  color: var(--pikachu-yellow);
  margin-bottom: 1.5rem;
  width: 100%;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.contributions-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 1rem 0;
}

.contributions-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.stats-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 8px;
  min-height: 150px;
  background: rgba(128, 128, 128, 0.1);
}

/* Animation */
.stats-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.stats-section.in-view {
  opacity: 1;
  transform: translateY(0);
}

.stat-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out,
    border-color 0.3s ease, box-shadow 0.3s ease;
}

.stats-section.in-view .stat-card {
  opacity: 1;
  transform: translateY(0);
}

.stats-section.in-view .stat-card:nth-child(1) {
  transition-delay: 0.1s;
}

.stats-section.in-view .stat-card:nth-child(2) {
  transition-delay: 0.2s;
}

.stats-section.in-view .stat-card:nth-child(3) {
  transition-delay: 0.3s;
}

.stats-section.in-view .stat-card:nth-child(4) {
  transition-delay: 0.4s;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .contributions-card {
    grid-column: 1;
  }

  .title {
    font-size: 2rem;
  }

  .contributions-wrapper {
    overflow-x: auto;
  }
}

/* Light Mode */
.light .stats-section {
  background: #ffffff;
}

.light .title {
  color: #1a202c;
  background: none;
  -webkit-text-fill-color: currentColor;
  font-weight: 800;
}

.light .subtitle {
  color: #4b5563;
  font-weight: 500;
}

.light .stat-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.light .stat-card:hover {
  border-color: #94a3b8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-5px);
}

.light .card-title {
  color: #1e293b;
  font-weight: normal;
}

.light .icon {
  color: #475569;
}

.light .stats-img {
  background: transparent;
}
</style>
