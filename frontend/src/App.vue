<template>
  <div>
    <button @click="gerarPix">Gerar Pix</button>

    <div v-if="pix">
      <img :src="`data:image/png;base64,${pix.qr_code_base64}`" />
      <p>{{ pix.qr_code }}</p>
    </div>
  </div>
</template>

<script>
import payments from '../services/payment.js';

export default {
  data() {
    return {
      pix: null,
    };
  },
  methods: {
    async gerarPix() {
      try {
        const response = await payments.pix();
        this.pix = response;
      } catch (error) {
        console.error('Erro ao gerar Pix', error);
      }
    },
  },
};
</script>

<style scoped>
button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>

