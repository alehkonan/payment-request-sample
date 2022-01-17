import { calculateTotal, cart } from './cart.js';
const payButton = document.getElementById('pay-button');

// with this method you can use any card like visa or mastercard
// but it will be depricated in the near future
const basicCard: PaymentMethodData = {
  supportedMethods: 'basic-card',
  data: {
    supportedNetworks: ['visa', 'mastercard'],
    supportedTypes: ['debit', 'credit'],
  },
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

const applePay: PaymentMethodData = {
  supportedMethods: 'https://apple.com/apple-pay',
  data: {
    version: 3, // required
    merchantIdentifier: 'merchant.com.example', // required
    merchantCapabilities: ['supports3DS'], // required
    supportedNetworks: ['mastercard', 'visa'], // required
    countryCode: 'US', // required
    requiredBillingContactFields: ['postalAddress', 'name', 'phoneticName'],
    requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
  },
};

const googlePay: PaymentMethodData = {
  supportedMethods: 'https://google.com/pay',
  data: {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
      merchantId: '12345678901234567890', // is available after approval by Google.
      merchantName: 'Example Merchant',
    },
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
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
    [basicCard, samsungPay, applePay, googlePay],
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
