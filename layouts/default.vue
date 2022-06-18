<template>
  <div class="font-serif">
    <nav
      class="navbar header has-shadow is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="py-0 section navbar-brand">
          <a class="navbar-item" href="/">
            <b-icon icon="camera"> </b-icon>
            <h1 class="ml-4 text-xl font-semibold uppercase">Website Shot</h1>
          </a>
        </div>
      </div>
    </nav>

    <main class="sm:px-[30px] mx-auto max-w-4xl px-5">
      <Nuxt />
    </main>

    <footer class="flex justify-center p-8 text-center">
      <div>
        <span>
          Built with 💙 By
          <a
            href="https://github.com/Flowko"
            class="text-primary-200 hover:text-primary-100"
            target="_blank"
            >@Flowko</a
          >
          Using
          <a
            href="https://nuxtjs.org/"
            class="text-primary-200 hover:text-primary-100"
            target="_blank"
            >Nuxtjs</a
          >

          ·
          <a
            href="https://buefy.org/documentation/start/"
            class="text-primary-200 hover:text-primary-100"
            target="_blank"
            >Buefy</a
          >

          and more!
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>
