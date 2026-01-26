<template>
  <div class="container">
    <form class="card" @submit.prevent="submitForm">
      <h2>Filiação Global</h2>

      <!-- DADOS PESSOAIS -->
      <h3>DADOS PESSOAIS</h3>

      <input v-model="form.nome" placeholder="Nome completo" required />
      <input v-model="form.endereco" placeholder="Endereço completo" required />
      <input v-model="form.celular" placeholder="Celular" required />

      <div style="width: 100%; text-align: left; margin-top: 25px; margin-bottom: 15px;">
        <label>Data de nascimento</label>
      </div> 
      <input type="date" v-model="form.nascimento" required />

      <div style="width: 100%; display: flex;"> 
        <select style="margin-rigth: 10px;" v-model="form.sexo" required>
          <option disabled value="">Sexo</option>
          <option>Masculino</option>
          <option>Feminino</option>
        </select>

        <select v-model="form.escolaridade">
          <option disabled value="">Escolaridade</option>
          <option>Fundamental</option>
          <option>Médio</option>
          <option>Superior</option>
        </select>
      </div> 

      <input type="email" v-model="form.email" placeholder="E-mail" required />

      <!-- DADOS ESPORTIVOS -->
      <h3>DADOS ESPORTIVOS</h3>

      <input
        v-model="form.modalidade"
        placeholder="Modalidade esportiva principal"
        required
      />

      <input
        v-model="form.instituicao"
        placeholder="Academia / Clube / Empresa"
      />

      <input
        v-model="form.enderecoInstituicao"
        placeholder="Endereço da instituição"
      />

      <input v-model="form.telefoneInstituicao" placeholder="Telefone" />
      <input v-model="form.celularInstituicao" placeholder="Celular" />
      <input
        type="email"
        v-model="form.emailInstituicao"
        placeholder="E-mail da instituição"
      />

      <!-- TIPO DE FILIAÇÃO -->
      <h3>FILIAÇÃO</h3>

      <select v-model="form.tipoFiliacao" required>
        <option disabled value="">Selecione o tipo de filiação</option>
        <option value="atleta">Filiação de Atleta</option>
        <option value="academia">Filiação de Academia / Clube / Empresa</option>
        <option value="parceria">Filiação de Parceria</option>
      </select>

      <!-- TERMOS -->
      <label class="checkbox">
        <input type="checkbox" v-model="form.aceite" />
        Estou de acordo com as regras da Global.
      </label>

      <button type="submit" :disabled="!formValido">
        Prosseguir para pagamento
      </button>

      <div v-if="etapaPagamento" class="payment-tabs">
        <button
          type="button"
          :class="{ active: metodoPagamento === 'pix' }"
          @click="selecionarMetodo('pix')"
        >
          Pix
        </button>

        <button
          type="button"
          :class="{ active: metodoPagamento === 'card' }"
          @click="selecionarMetodo('card')"
        >
          Débito / Crédito
        </button>
      </div>
      <PixPayment :active="metodoPagamento === 'pix'" />

    </form>
  </div>
</template>

<script>
import PixPayment from "./payments/PixPayment.vue";
import payments from "../services/payment.js";

export default {
  name: "FiliacaoForm",
  components: {
    PixPayment,
  },

  data() {
    return {
      pix: null,
      etapaPagamento: false,
      metodoPagamento: null,
      form: {
        nome: "",
        endereco: "",
        telefone: "",
        celular: "",
        nascimento: "",
        sexo: "",
        escolaridade: "",
        email: "",

        modalidade: "",
        instituicao: "",
        enderecoInstituicao: "",
        telefoneInstituicao: "",
        celularInstituicao: "",
        emailInstituicao: "",

        tipoFiliacao: "",
        aceite: false,
      },
    };
  },

  computed: {
    formValido() {
      return (
        this.form.nome &&
        this.form.endereco &&
        this.form.celular &&
        this.form.nascimento &&
        this.form.sexo &&
        this.form.email &&
        this.form.modalidade &&
        this.form.tipoFiliacao &&
        this.form.aceite
      );
    },
  },

  methods: {
    submitForm() {
      if (!this.formValido) {
        alert("Preencha todos os campos obrigatórios antes de prosseguir.");
        return;
      }

      this.etapaPagamento = true;
    },

    selecionarMetodo(metodo) {
      this.metodoPagamento = metodo;
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: #f4f6f8;
  width: 60vh;
}

.card {
  width: 87%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

h2,
h3 {
  margin-bottom: 12px;
}

input{
  width: 90%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

select {
  width: 45%;
  padding: 10px;
  margin-bottom: 12px;
  margin-left: 14px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  display:flex;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #111;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
}

.pix {
  margin-top: 20px;
  text-align: center;
}

.pix img {
  width: 220px;
  margin: 10px auto;
}

.pix-code {
  font-size: 12px;
}

.checkbox {
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 20px;
  border: solid 1px black;
  border-radius: 8px;

}

.checkbox input { width: 100px;   border: solid 1px red; }

.payment-tabs {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.payment-tabs button {
  flex: 1;
  background: #eee;
  color: #000;
}

.payment-tabs button.active {
  background: #111;
  color: #fff;
}

</style>
