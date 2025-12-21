<template>
  <header
    class="navbar"
    :class="{ hidden: isHidden, scrolled: isScrolled }"
    ref="navbarRef"
  >
    <div class="navbar-logo loading-text" @click="onNavClick('home')">
      Mohamed Saied
    </div>

    <div class="navbar-controls">
      <ul class="navbar-links desktop-menu">
        <li v-for="item in menuItems" :key="item.section">
          <a
            :href="'#' + item.section"
            @click.prevent="onNavClick(item.section)"
            :class="{ active: activeSection === item.section }"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <button
        class="theme-toggle"
        @click="toggleTheme"
        :aria-label="
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
      >
        <svg
          v-if="theme === 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="theme-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="theme-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      </button>
    </div>

    <div
      class="mobile-menu-toggle"
      @click="toggleMobileMenu"
      :class="{ active: isMobileMenuOpen }"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>

  <div
    class="mobile-backdrop"
    :class="{ active: isMobileMenuOpen }"
    @click="isMobileMenuOpen = false"
  ></div>

  <div class="mobile-sidebar" :class="{ active: isMobileMenuOpen }">
    <div class="mobile-theme-toggle">
      <button
        class="theme-toggle mobile"
        @click="toggleTheme"
        :aria-label="
          theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
      >
        <svg
          v-if="theme === 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="theme-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="theme-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
        <span class="theme-text">{{
          theme === "dark" ? "Light Mode" : "Dark Mode"
        }}</span>
      </button>
    </div>
    <ul class="mobile-menu-links">
      <li
        v-for="(item, index) in menuItems"
        :key="'mobile-' + item.section"
        :style="{
          transitionDelay: isMobileMenuOpen ? 0.1 * (index + 1) + 's' : '0s',
        }"
      >
        <a
          :href="'#' + item.section"
          @click.prevent="onNavClick(item.section)"
          :class="{ active: activeSection === item.section }"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const { theme, setTheme } = useTheme();

const menuItems = [
  { section: "home", label: "Home" },
  { section: "about", label: "About" },
  { section: "portofolio", label: "Portfolio" },
  { section: "contact", label: "Contact" },
];

const activeSection = ref("home");
const isHidden = ref(false);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const navbarRef = ref(null);

let lastScrollY = 0;
let isClickScrolling = false;
let navbarHeight = 80;

const toggleTheme = () => {
  setTheme(theme.value === "dark" ? "light" : "dark");
};

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
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Navbar Utama */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--navbar-bg);
  backdrop-filter: blur(10px); /* Ini biang keroknya tadi */
  border-bottom: 1px solid var(--navbar-border);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}
.navbar.hidden {
  transform: translateY(-100%);
}
.navbar.scrolled {
  background: var(--navbar-bg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
  color: var(--text-white);
}
.navbar-logo:hover {
  transform: scale(1.05);
}

.navbar-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: var(--text-white);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.theme-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 2.5rem;
}
.navbar-links a {
  text-decoration: none;
  font-size: 1rem;
  color: var(--text-white);
  transition: all 0.3s ease;
  position: relative;
}
.navbar-links a:hover {
  color: var(--neon-blue);
  text-shadow: 0 0 5px var(--neon-blue);
}
.navbar-links a.active {
  color: var(--pikachu-yellow);
  text-shadow: 0 0 5px var(--pikachu-yellow);
}

.mobile-menu-toggle {
  display: none;
}

/* Sidebar & Backdrop Default State */
.mobile-backdrop,
.mobile-sidebar {
  display: none;
}

/* MEDIA QUERY */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }
  .navbar-links {
    display: none;
  }
  .navbar-logo {
    font-size: 1.3rem;
  }

  .mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 1002;
  }
  .mobile-menu-toggle span {
    width: 25px;
    height: 3px;
    background: var(--pikachu-yellow);
    margin: 3px 0;
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
  }
  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* BACKDROP (Sekarang di luar header) */
  .mobile-backdrop {
    display: block;
    position: fixed;
    inset: 0; /* Full Screen Aman */
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 2000; /* Di atas Navbar (1000) */
  }
  .mobile-backdrop.active {
    opacity: 1;
    pointer-events: all;
  }

  /* SIDEBAR (Sekarang di luar header) */
  .mobile-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0; /* Full Height Aman */
    width: 75%;
    max-width: 300px;
    background: var(--mobile-menu-bg);
    border-left: 1px solid var(--mobile-menu-border);
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2001; /* Paling atas */
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
  }
  .mobile-sidebar.active {
    transform: translateX(0);
  }

  .mobile-menu-links {
    list-style: none;
    text-align: center;
    padding: 0;
    margin: 0;
  }
  .mobile-menu-links li {
    margin: 1.5rem 0;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.4s ease;
  }
  .mobile-sidebar.active .mobile-menu-links li {
    opacity: 1;
    transform: translateX(0);
  }

  .mobile-menu-links a {
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--text-white);
    display: block;
    padding: 0.5rem 1rem;
  }
  .mobile-menu-links a.active {
    color: var(--pikachu-yellow);
  }

  .mobile-theme-toggle {
    padding: 1rem;
    border-bottom: 1px solid var(--mobile-menu-border);
    margin-bottom: 1rem;
  }

  .theme-toggle.mobile {
    width: 100%;
    justify-content: flex-start;
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }

  .theme-toggle.mobile .theme-text {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
