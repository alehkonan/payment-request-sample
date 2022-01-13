import { calculateTotal, cart } from './cart.js';
const payButton = document.getElementById('pay-button');

const basicCard: PaymentMethodData = {
  supportedMethods: 'basic-card',
};

const samsungPay: PaymentMethodData = {
  supportedMethods: 'https://spay.samsung.com',
  data: {
    version: '1',
    productId: '2bc3e6da781e4e458b18bc', //Service id from partner portal
    allowedCardNetworks: ['mastercard', 'visa'],
    orderNumber: '1233123',
    merchantName: 'Shop Samsung (demo)', //Merchant name in partner portal
    merchantGatewayParameter: { userId: 'acct_17irF7F6yPzJ7wOR' },
  },
};

const paymentDetails: PaymentDetailsInit = {
  id: 'item',
  displayItems: cart,
  total: calculateTotal(cart),
};

const onClick = async () => {
  if (!window.PaymentRequest) {
    console.log('Payment Request API doesn`t suppurted');
    return;
  }

  const paymentRequest = new PaymentRequest(
    [basicCard, samsungPay],
    paymentDetails
  );
  const canMakePayment = await paymentRequest.canMakePayment();

  if (!canMakePayment) {
    console.log('Can`t make payment with this methods');
    return;
  }

  const paymentResponse = await paymentRequest.show();
  console.log(paymentResponse);

  // validate paymentResponse on your server

  const validationResult = true;

  if (validationResult) {
    paymentResponse.complete('success');
  } else {
    paymentResponse.complete('fail');
  }
};

payButton?.addEventListener('click', onClick);
