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
          <!-- Home Icon -->
          <svg
            v-if="item.section === 'home'"
            class="nav-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <!-- About Icon -->
          <svg
            v-else-if="item.section === 'about'"
            class="nav-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <!-- Github Activity Icon -->
          <svg
            v-else-if="item.section === 'github-stats'"
            class="nav-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          <!-- Portfolio Icon -->
          <svg
            v-else-if="item.section === 'portofolio'"
            class="nav-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
            ></path>
          </svg>
          <!-- Contact Icon -->
          <svg
            v-else-if="item.section === 'contact'"
            class="nav-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
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
  { section: "github-stats", label: "Github Activity" },
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
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
  }

  .nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
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
