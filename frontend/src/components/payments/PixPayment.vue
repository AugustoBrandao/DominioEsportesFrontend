<template>
  <div v-if="active" class="card pix">
    <h3>Pagamento via Pix</h3>

    <div v-if="loading">Gerando Pix...</div>

    <div v-if="pix">
      <img :src="`data:image/png;base64,${pix.qr_code_base64}`" />
      <p class="pix-code">{{ pix.qr_code }}</p>
    </div>
  </div>
</template>

<script>
import payments from "../../services/payment.js";

export default {
  name: "PixPayment",

  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      pix: null,
      loading: false,
      jaGerado: false,
    };
  },

  watch: {
    async active(val) {
      if (val && !this.jaGerado) {
        await this.gerarPix();
      }
    },
  },

  methods: {
    async gerarPix() {
      this.loading = true;
      try {
        this.pix = await payments.pix();
        this.jaGerado = true;
      } catch (err) {
        console.error("Erro ao gerar Pix", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.pix { margin-top: 20px; text-align: center; } 
.pix img { width: 220px; margin: 10px auto; } 
.pix-code { word-break: break-all; font-size: 12px; }
</style>
