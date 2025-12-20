<template>
  <header
    class="fixed top-0 left-0 right-0 px-12 py-4 flex justify-between items-center bg-gray-900/40 backdrop-blur-[10px] border-b border-white/5 z-50 transition-all duration-300"
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
          class="text-base text-gray-100 transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_5px_#3b82f6] relative"
          :class="{
            'text-yellow-400 drop-shadow-[0_0_5px_#fbbf24]':
              activeSection === item.section,
          }"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>

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
    class="fixed top-0 right-0 bottom-0 w-3/4 max-w-[300px] bg-gray-900/25 border-l border-white/10 translate-x-full transition-transform duration-300 ease-out z-[2001] shadow-[-5px_0_20px_rgba(0,0,0,0.5)] md:hidden flex flex-col justify-center"
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
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

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
