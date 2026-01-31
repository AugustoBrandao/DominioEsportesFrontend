<template>
  <div class="payment-wrapper">
    <form id="form-checkout" class="credit-card">
      <div class="card-header">
        <span class="card-title">Pagamento com Cartão</span>
        <span class="card-brand">💳</span>
      </div>

      <div class="card-number">
        <div id="form-checkout__cardNumber" class="mp-field"></div>
      </div>

      <div class="card-row">
        <div id="form-checkout__expirationDate" class="mp-field"></div>
        <div id="form-checkout__securityCode" class="mp-field"></div>
      </div>

      <input
        type="text"
        id="form-checkout__cardholderName"
        class="input"
        placeholder="Nome impresso no cartão"
      />

      <div class="card-row">
        <select id="form-checkout__issuer" class="input"></select>
        <select id="form-checkout__installments" class="input"></select>
      </div>

      <div class="card-row">
        <select id="form-checkout__identificationType" class="input"></select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          class="input"
          placeholder="Documento"
        />
      </div>

      <input
        type="email"
        id="form-checkout__cardholderEmail"
        class="input"
        placeholder="E-mail"
      />

      <button type="submit" id="form-checkout__submit" class="btn-pay">
        💳 Pagar
      </button>

      <progress value="0" class="progress-bar">Carregando...</progress>
    </form>
  </div>
</template>


<script>
import { loadMercadoPago } from "@mercadopago/sdk-js";
import payments from "../../services/payment.js";


export default {
  name: "CardPayment",

  async mounted() {
    await loadMercadoPago();
    const mp = new window.MercadoPago("TEST-6c63666a-a26f-4a42-ab47-d3391a1db7e8");

    const cardForm = mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },        
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: event => {
          event.preventDefault();

          const formData = cardForm.getCardFormData();

          console.log("TOKEN GERADO:", formData.token);

          payments.card({
            token: formData.token,
            issuer_id: formData.issuerId,
            payment_method_id: formData.paymentMethodId,
            transaction_amount: Number(formData.amount),
            installments: Number(formData.installments),
            description: "Descrição do produto",
            payer: {
              email: formData.cardholderEmail,
              identification: {
                type: formData.identificationType,
                number: formData.identificationNumber,
              },
            },
          });
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        }
      },
    });
  },
};
</script>


<style scoped>
.payment-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.credit-card {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(135deg, #111, #2b2b2b);
  border-radius: 18px;
  padding: 25px;
  color: #fff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
}

.card-brand {
  font-size: 22px;
}

/* Mercado Pago iframe fields */
.mp-field {
  height: 42px;
  background: #fff;
  border-radius: 8px;
  padding: 6px 10px;
}

/* Número do cartão */
.card-number .mp-field {
  height: 46px;
  font-size: 16px;
}

/* Rows */
.card-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* Inputs normais */
.input {
  height: 42px;
  border-radius: 8px;
  border: none;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
}

/* Botão */
.btn-pay {
  margin-top: 10px;
  height: 46px;
  border-radius: 10px;
  border: none;
  background: #00d084;
  color: #111;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-pay:hover {
  background: #00b974;
}

/* Progress */
.progress-bar {
  width: 100%;
  margin-top: 6px;
}

</style>