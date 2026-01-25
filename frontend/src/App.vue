<template>
  <div class="container">
    <FiliacaoForm />
  </div>
</template>

<script>
import FiliacaoForm from "./components/FiliacaoForm.vue";

export default {
  components: {
    FiliacaoForm,
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
