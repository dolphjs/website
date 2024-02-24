<script setup lang="ts">
  import { onMounted } from "vue";
  import { load, data, base, constantImage } from "./partners";
  import DolphMateryModal from "./DolphMateryModal.vue";

  onMounted(async () => {
    await load();
  });
</script>

<template>
  <section id="hero">
    <h1 class="tagline">
      The
      <span class="accent">node.js</span>
      <br />framework for you
    </h1>
    <p class="description">
      typescript and javascript nodejs backend framework built to ease
      development and shorten code while retaining simplicity.
    </p>
    <p class="actions">
      <DolphMateryModal />
      <a class="get-started" href="/guide/introduction.html">
        Get Started
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>
      <a class="setup" href="/guide/quick-start.html">Install</a>
    </p>
  </section>

  <!-- <section v-if="data" id="special-partner">
    <span class="lead">Special Partner</span>
    <template>
      <a
        :href="`${base}${constantImage}`"
        target="_blank"
        rel="sponsored noopener"
      >
        <picture>
          <img width="168" height="42" :src="`${base}`" alt="name" />
        </picture>
        <img />
      </a>
      <span>the node.js framework for you</span>
    </template>
  </section> -->
</template>

<style scoped>
  section {
    padding: 42px 32px;
  }

  #hero {
    padding: 96px 32px;
    text-align: center;
  }
  .tagline {
    font-size: 76px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    max-width: 960px;
    margin: 0px auto;
  }

  html:not(.dark) .accent,
  .dark .tagline {
    background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    max-width: 960px;
    line-height: 1.5;
    color: var(--vt-c-text-2);
    transition: color 0.5s;
    font-size: 22px;
    margin: 24px auto 40px;
  }

  .actions a {
    font-size: 16px;
    display: inline-block;
    background-color: var(--vt-c-bg-mute);
    padding: 8px 18px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.5s, color 0.5s;
  }

  .actions .get-started {
    margin-right: 18px;
  }

  .actions .icon {
    display: inline;
    position: relative;
    top: -1px;
    margin-left: 2px;
    fill: currentColor;
    transition: transform 0.2s;
  }

  .actions .get-started:hover {
    transition-duration: 0.2s;
  }

  .actions .get-started:hover .icon {
    transform: translateX(2px);
  }

  .actions .get-started,
  .actions .setup {
    color: var(--vt-c-text-code);
  }

  .actions .get-started:hover,
  .actions .setup:hover {
    background-color: var(--vt-c-gray-light-4);
    transition-duration: 0.2s;
  }

  .dark .actions .get-started:hover,
  .dark .actions .setup:hover {
    background-color: var(--vt-c-gray-dark-3);
  }

  #special-partner {
    border-top: 1px solid var(--vt-c-divider-light);
    border-bottom: 1px solid var(--vt-c-divider-light);
    padding: 12px 24px;
    display: flex;
    align-items: center;
  }

  #special-partner span {
    color: var(--vt-c-text-2);
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
    flex: 1;
  }

  #special-partner span:first-child {
    text-align: right;
  }

  #special-partner a {
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }

  #special-partner img {
    height: 42px;
    margin: -6px 0;
  }

  .dark #special-partner img {
    filter: grayscale(1) invert(1);
  }

  #highlights {
    max-width: 960px;
    margin: 0px auto;
    color: var(--vt-c-text-2);
  }

  #highlights h2 {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: -0.4px;
    color: var(--vt-c-text-1);
    transition: color 0.5s;
    margin-bottom: 0.75em;
  }

  #highlights p {
    font-weight: 400;
    font-size: 15px;
  }

  #highlights .vt-box {
    background-color: transparent;
  }

  #partners {
    max-width: 900px;
    margin: 0px auto;
  }

  #partners h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1em;
  }

  #partners .partner-container {
    margin-bottom: 3em;
  }

  @media (max-width: 960px) {
    .tagline {
      font-size: 64px;
      letter-spacing: -0.5px;
    }
    .description {
      font-size: 18px;
      margin-bottom: 48px;
    }
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 48px;
      letter-spacing: -0.5px;
    }
  }

  @media (max-width: 576px) {
    #hero {
      padding: 56px 32px;
    }
    .description {
      font-size: 16px;
      margin: 18px 0 30px;
    }
    #special-partner {
      flex-direction: column;
    }
    #special-partner img {
      height: 36px;
      margin: 8px 0;
    }
    #special-partner span {
      text-align: center !important;
    }
    #highlights h3 {
      margin-bottom: 0.6em;
    }
    #highlights .vt-box {
      padding: 20px 36px;
    }
    .actions a {
      margin: 18px 0;
    }
  }

  @media (max-width: 370px) {
    .tagline {
      font-size: 36px;
    }
  }
</style>
