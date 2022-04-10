<template>
  <div class="font-serif text-white">
    <nav
      class="navbar header has-shadow is-danger"
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

    <div class="container">
      <Nuxt />
    </div>
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
