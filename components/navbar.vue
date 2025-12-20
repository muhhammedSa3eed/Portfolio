<template>
  <header
    class="fixed top-0 left-0 right-0 px-12 py-4 flex justify-between items-center backdrop-blur-[10px] z-50 transition-all duration-300"
    :class="{
      '-translate-y-full': isHidden,
      'bg-gray-900/85 shadow-[0_4px_15px_rgba(0,0,0,0.4)]': isScrolled,
    }"
    ref="navbarRef"
  >
    <div
      class="text-xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 text-white loading-text"
      @click="onNavClick('home')"
    >
      Mohamed Saied
    </div>

    <ul class="hidden md:flex gap-10 list-none desktop-menu">
      <li v-for="item in menuItems" :key="item.section">
        <a
          :href="'#' + item.section"
          @click.prevent="onNavClick(item.section)"
          class="text-base text-[var(--text-secondary)] dark:text-gray-100 transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_5px_#3b82f6] relative"
          :class="{
            'text-yellow-400 drop-shadow-[0_0_5px_#fbbf24]':
              activeSection === item.section,
          }"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>

    <button class="btn-theme-toggle hidden md:flex" @click="toggleTheme">
      <svg
        class="btn-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </button>

    <div
      class="flex flex-col cursor-pointer z-[1002] md:hidden"
      @click="toggleMobileMenu"
      :class="{ 'rotate-45': isMobileMenuOpen }"
    >
      <span
        class="w-6 h-0.5 bg-yellow-400 my-0.5 transition-all duration-300 rounded"
      ></span>
      <span
        class="w-6 h-0.5 bg-yellow-400 my-0.5 transition-all duration-300 rounded"
        :class="{ 'opacity-0': isMobileMenuOpen }"
      ></span>
      <span
        class="w-6 h-0.5 bg-yellow-400 my-0.5 transition-all duration-300 rounded"
        :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
      ></span>
    </div>
  </header>

  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-[4px] opacity-0 pointer-events-none transition-opacity duration-300 z-[2000] md:hidden"
    :class="{ 'opacity-100 pointer-events-auto': isMobileMenuOpen }"
    @click="isMobileMenuOpen = false"
  ></div>

  <div
    class="fixed top-0 right-0 bottom-0 w-3/4 max-w-[300px] mobile-menu translate-x-full transition-transform duration-300 ease-out z-[2001] shadow-[-5px_0_20px_rgba(0,0,0,0.5)] md:hidden flex flex-col justify-center"
    :class="{ 'translate-x-0': isMobileMenuOpen }"
  >
    <ul class="list-none text-center p-0 m-0">
      <li
        v-for="(item, index) in menuItems"
        :key="'mobile-' + item.section"
        class="my-6 opacity-0 translate-x-5 transition-all duration-400 ease-out"
        :class="{ 'opacity-100 translate-x-0': isMobileMenuOpen }"
        :style="{
          transitionDelay: isMobileMenuOpen ? 0.1 * (index + 1) + 's' : '0s',
        }"
      >
        <a
          :href="'#' + item.section"
          @click.prevent="onNavClick(item.section)"
          class="text-2xl font-bold text-white block p-2"
          :class="{ 'text-yellow-400': activeSection === item.section }"
        >
          {{ item.label }}
        </a>
      </li>
      <li
        class="my-6 opacity-0 translate-x-5 transition-all duration-400 ease-out"
        :class="{ 'opacity-100 translate-x-0': isMobileMenuOpen }"
        :style="{
          transitionDelay: isMobileMenuOpen
            ? 0.1 * (menuItems.length + 1) + 's'
            : '0s',
        }"
      >
        <button
          @click="toggleTheme"
          class="text-2xl font-bold text-white block p-2"
        >
          {{ isLightMode ? "Dark Mode" : "Light Mode" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const menuItems = [
  { section: "home", label: "Home" },
  { section: "about", label: "About" },
  { section: "github-stats", label: "GitHub Activity" },
  { section: "portofolio", label: "Portfolio" },
  { section: "contact", label: "Contact" },
];

const activeSection = ref("home");
const isHidden = ref(false);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const navbarRef = ref(null);
const isLightMode = ref(false);

let lastScrollY = 0;
let isClickScrolling = false;
let navbarHeight = 80;

const throttle = (fn, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
};

const handleScroll = throttle(() => {
  if (isClickScrolling) return;

  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollY && currentScroll > 100) {
    isHidden.value = true;
    isMobileMenuOpen.value = false;
  } else {
    isHidden.value = false;
  }

  isScrolled.value = currentScroll > 50;
  lastScrollY = currentScroll;

  for (const item of menuItems) {
    const element = document.getElementById(item.section);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = navbarHeight + 100;
      if (rect.top <= offset && rect.bottom >= offset) {
        activeSection.value = item.section;
      }
    }
  }
}, 100);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value;
  if (isLightMode.value) {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
  localStorage.setItem("theme", isLightMode.value ? "light" : "dark");
};

const onNavClick = (sectionId) => {
  isClickScrolling = true;
  isMobileMenuOpen.value = false;
  activeSection.value = sectionId;

  const element = document.getElementById(sectionId);
  if (element) {
    const topPos = element.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: topPos, behavior: "smooth" });
  }

  setTimeout(() => {
    isClickScrolling = false;
  }, 1000);
};

onMounted(() => {
  if (navbarRef.value) {
    navbarHeight = navbarRef.value.offsetHeight;
  }
  window.addEventListener("scroll", handleScroll);

  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    isLightMode.value = true;
    document.documentElement.classList.add("light");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
header {
  background-color: var(--navbar-bg) !important;
  border-bottom: 1px solid var(--navbar-border) !important;
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

.mobile-menu {
  background-color: var(--mobile-menu-bg) !important;
  border-left: 1px solid var(--mobile-menu-border) !important;
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

.btn-theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
}

.btn-theme-toggle:hover {
  border-color: #fbbf24;
  color: #fbbf24;
  transform: scale(1.05);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

/* ===== PROFESSIONAL LIGHT MODE STYLES ===== */

.light header {
  background-color: rgba(255, 255, 255, 0.95) !important;
  border-bottom: 1px solid #e2e8f0 !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.light header.bg-gray-900\/85 {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.light .loading-text {
  background: linear-gradient(90deg, transparent, #2563eb, transparent);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.light .desktop-menu a {
  color: #64748b;
}

.light .desktop-menu a:hover {
  color: #2563eb !important;
  text-shadow: 0 0 5px rgba(37, 99, 235, 0.3) !important;
}

.light .desktop-menu a.text-yellow-400 {
  color: #2563eb !important;
  text-shadow: 0 0 5px rgba(37, 99, 235, 0.4) !important;
}

.light .btn-theme-toggle {
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.light .btn-theme-toggle:hover {
  border-color: #2563eb;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.05);
}

.light .mobile-menu {
  background-color: rgba(255, 255, 255, 0.98) !important;
  border-left: 1px solid #e2e8f0 !important;
}

.light .mobile-menu a {
  color: #1a202c;
}

.light .mobile-menu a.text-yellow-400 {
  color: #2563eb !important;
}

.light header > div:last-child span {
  background: #2563eb;
}
</style>
