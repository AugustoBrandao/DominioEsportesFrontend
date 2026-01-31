<template>
  <div class="container">
    <h2>Filiados Cadastrados</h2>

    <p v-if="loading">Carregando filiados...</p>
    <p v-else-if="!filiados.length">Nenhum filiado encontrado.</p>

    <table v-else class="filiados-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Celular</th>
          <th>Email</th>
          <th>Método de Pagamento</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="filiado in filiados" :key="filiado.id_cadastro">
          <td>{{ filiado.nome }}</td>
          <td>{{ filiado.celular }}</td>
          <td>{{ filiado.email }}</td>
          <td>{{ filiado.pix ? 'Pix' : 'Crédito / Débito' }}</td>
          <td>
            <button class="btn-details" @click="abrirModal(filiado)">
              🔍 Ver detalhes
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL -->
    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h3>📄 Dados do Filiado</h3>

          <table class="modal-table">
            <tr>
              <td class="label">ID</td>
              <td>{{ filiadoSelecionado.id_cadastro }}</td>
            </tr>
            <tr>
              <td class="label">Nome</td>
              <td>{{ filiadoSelecionado.nome }}</td>
            </tr>
            <tr>
              <td class="label">Endereço</td>
              <td>{{ filiadoSelecionado.endereco }}</td>
            </tr>
            <tr>
              <td class="label">Celular</td>
              <td>{{ filiadoSelecionado.celular }}</td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td>{{ filiadoSelecionado.email }}</td>
            </tr>
            <tr>
              <td class="label">Nascimento</td>
              <td>{{ filiadoSelecionado.nascimento }}</td>
            </tr>
            <tr>
              <td class="label">Sexo</td>
              <td>{{ filiadoSelecionado.sexo ? 'Masculino' : 'Feminino' }}</td>
            </tr>
            <tr>
              <td class="label">Escolaridade</td>
              <td>{{ filiadoSelecionado.escolaridade }}</td>
            </tr>
            <tr>
              <td class="label">Modalidade</td>
              <td>{{ filiadoSelecionado.modalidade_esportiva }}</td>
            </tr>
            <tr>
              <td class="label">Instituição</td>
              <td>{{ filiadoSelecionado.academia_clube_empresa }}</td>
            </tr>
            <tr>
              <td class="label">Endereço Instituição</td>
              <td>{{ filiadoSelecionado.endereco_instituicao }}</td>
            </tr>
            <tr>
              <td class="label">Telefone</td>
              <td>{{ filiadoSelecionado.telefone }}</td>
            </tr>
            <tr>
              <td class="label">Email Instituição</td>
              <td>{{ filiadoSelecionado.email_instituicao }}</td>
            </tr>
            <tr>
              <td class="label">Tipo de Filiação</td>
              <td>{{ filiadoSelecionado.tipo_instituicao }}</td>
            </tr>
            <tr>
              <td class="label">Pagamento</td>
              <td>{{ filiadoSelecionado.pix ? 'Pix' : 'Crédito / Débito' }}</td>
            </tr>
          </table>

        <button class="btn-close" @click="fecharModal">Fechar</button>
      </div>
    </div>
  </div>
</template>


<script>
import payments from "../services/payment.js";

export default {
  name: "ShowFiliados",

  data() {
    return {
      filiados: [],
      loading: false,
      modalAberto: false,
      filiadoSelecionado: {},
    };
  },

  async mounted() {
    this.loading = true;
    try {
      const response = await payments.getFiliados();
      this.filiados = response.data ?? response;
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar filiados");
    } finally {
      this.loading = false;
    }
  },

  methods: {
    abrirModal(filiado) {
      this.filiadoSelecionado = filiado;
      this.modalAberto = true;
    },
    fecharModal() {
      this.modalAberto = false;
      this.filiadoSelecionado = {};
    },
  },
};
</script>


<style scoped>
.container {
  padding: 20px;
}

/* =======================
   TABELA PRINCIPAL
======================= */

.filiados-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
}

.filiados-table th,
.filiados-table td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.filiados-table th {
  background: #111;
  color: #fff;
  text-align: left;
}

.filiados-table tr:hover {
  background: #f5f5f5;
}

.btn-details {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: #111;
  color: #fff;
}

/* =======================
   MODAL
======================= */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 25px;
  border-radius: 14px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  margin-bottom: 15px;
}

.btn-close {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #111;
  color: #fff;
  cursor: pointer;
}

/* =======================
   TABELA DO MODAL
======================= */

.modal-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
}

.modal-table tr {
  border-bottom: 1px solid #e5e5e5;
}

.modal-table tr:last-child {
  border-bottom: none;
}

.modal-table td {
  padding: 10px 12px;
  vertical-align: top;
}

.modal-table .label {
  width: 35%;
  font-weight: 600;
  color: #444;
  background: #fafafa;
  border-right: 1px solid #e5e5e5;
}

</style>

