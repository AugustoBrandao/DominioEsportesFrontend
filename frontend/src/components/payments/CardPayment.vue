<template>
  <div>
    <form id="form-checkout">
      <div id="form-checkout__cardNumber" class="container"></div>
      <div id="form-checkout__expirationDate" class="container"></div>
      <div id="form-checkout__securityCode" class="container"></div>
      <input type="text" id="form-checkout__cardholderName" />
      <select id="form-checkout__issuer"></select>
      <select id="form-checkout__installments"></select>
      <select id="form-checkout__identificationType"></select>
      <input type="text" id="form-checkout__identificationNumber" />
      <input type="email" id="form-checkout__cardholderEmail" />

      <button type="submit" id="form-checkout__submit">Pagar</button>
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
#form-checkout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}

.container {
  height: 38px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 4px;
  padding: 4px;
}
</style>