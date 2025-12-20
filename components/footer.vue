<template>
  <footer
    class="relative bg-gray-900 px-8 py-16 pb-8 text-gray-300 text-center overflow-hidden"
  >
    <div
      class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50 shadow-[0_0_10px_#fbbf24]"
    ></div>

    <div class="flex flex-col items-center gap-8 mb-12 max-w-7xl mx-auto">
      <div class="text-center">
        <h2
          class="font-rajdhani text-2xl font-bold text-white cursor-pointer transition-colors duration-300 hover:text-yellow-400 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] mb-2"
          @click="scrollToTop"
        >
          AliNour
        </h2>
        <p class="text-sm text-gray-400">Code, Create, Innovate.</p>
      </div>

      <ul class="flex gap-8 list-none p-0">
        <li>
          <a
            href="#home"
            class="text-gray-300 font-medium transition-all duration-300 hover:text-yellow-400 hover:-translate-y-0.5"
            @click.prevent="scrollToSection('home')"
            >Home</a
          >
        </li>
        <li>
          <a
            href="#about"
            class="text-gray-300 font-medium transition-all duration-300 hover:text-yellow-400 hover:-translate-y-0.5"
            @click.prevent="scrollToSection('about')"
            >About</a
          >
        </li>
        <li>
          <a
            href="#portofolio"
            class="text-gray-300 font-medium transition-all duration-300 hover:text-yellow-400 hover:-translate-y-0.5"
            @click.prevent="scrollToSection('portofolio')"
            >Portfolio</a
          >
        </li>
        <li>
          <a
            href="#contact"
            class="text-gray-300 font-medium transition-all duration-300 hover:text-yellow-400 hover:-translate-y-0.5"
            @click.prevent="scrollToSection('contact')"
            >Contact</a
          >
        </li>
      </ul>

      <div class="flex gap-6">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 hover:bg-yellow-400/10 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] border border-transparent"
        >
          <img
            :src="social.icon"
            :alt="social.name"
            class="w-5 h-5 grayscale transition-filter duration-300 hover:grayscale-0"
          />
        </a>
      </div>
    </div>

    <div class="border-t border-white/5 pt-8 text-sm text-gray-500">
      <p>
        &copy; {{ currentYear }}
        <span class="text-yellow-400 font-semibold">Mohamed Saied</span>. All
        Rights Reserved.
      </p>
      <p class="text-xs mt-2 opacity-60">Built with Vue.js & Nuxt</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = new Date().getFullYear();

const socialLinks = ref([
  {
    name: "Github",
    href: "https://github.com/muhhammedSa3eed",
    icon: "/github.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/muhhammed--ahmed/",
    icon: "/linkedin.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mohamed_ahmed_013/",
    icon: "/instagram.svg",
  },
]);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
/* ===== PROFESSIONAL LIGHT MODE FOOTER STYLES ===== */

.light footer {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  color: #475569;
  border-top: 1px solid #e2e8f0;
}

.light footer .absolute {
  background: linear-gradient(to right, transparent, #2563eb, transparent);
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
}

.light footer h2 {
  color: #1a202c;
}

.light footer h2:hover {
  color: #2563eb !important;
  filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.4));
}

.light footer p {
  color: #64748b;
}

.light footer ul li a {
  color: #64748b;
}

.light footer ul li a:hover {
  color: #2563eb !important;
}

.light footer .flex.gap-6 a {
  background: rgba(37, 99, 235, 0.05);
  border: 1px solid #e2e8f0;
}

.light footer .flex.gap-6 a:hover {
  background: rgba(37, 99, 235, 0.1);
  border-color: #2563eb;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.2);
}

.light footer .flex.gap-6 a img {
  filter: brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(876%)
    hue-rotate(182deg) brightness(95%) contrast(92%);
}

.light footer .flex.gap-6 a:hover img {
  filter: brightness(0) saturate(100%) invert(37%) sepia(93%) saturate(1265%)
    hue-rotate(213deg) brightness(95%) contrast(99%);
}

.light footer .border-t {
  border-color: #e2e8f0;
}

.light footer .text-gray-500 {
  color: #64748b;
}

.light footer .text-yellow-400 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
</style>
