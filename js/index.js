var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculateTotal, cart } from './cart.js';
const payButton = document.getElementById('pay-button');
const basicCard = {
    supportedMethods: 'basic-card',
    data: {
        supportedNetworks: ['visa', 'mastercard'],
        supportedTypes: ['debit', 'credit'],
    },
};
const samsungPay = {
    supportedMethods: 'https://spay.samsung.com',
    data: {
        version: '1',
        productId: '2bc3e6da781e4e458b18bc',
        allowedCardNetworks: ['mastercard', 'visa'],
        orderNumber: '1233123',
        merchantName: 'Shop Samsung (demo)',
        merchantGatewayParameter: { userId: 'acct_17irF7F6yPzJ7wOR' },
    },
};
const applePay = {
    supportedMethods: 'https://apple.com/apple-pay',
    data: {
        version: 3,
        merchantIdentifier: 'merchant.com.example',
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: ['mastercard', 'visa'],
        countryCode: 'US',
        requiredBillingContactFields: ['postalAddress', 'name', 'phoneticName'],
        requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
    },
};
const googlePay = {
    supportedMethods: 'https://google.com/pay',
    data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        merchantInfo: {
            merchantId: '12345678901234567890',
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
const paymentDetails = {
    id: 'item',
    displayItems: cart,
    total: calculateTotal(cart),
};
const onClick = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!window.PaymentRequest) {
        console.log('Payment Request API doesn`t suppurted');
        return;
    }
    const paymentRequest = new PaymentRequest([basicCard, samsungPay, applePay, googlePay], paymentDetails);
    const canMakePayment = yield paymentRequest.canMakePayment();
    if (!canMakePayment) {
        console.log('Can`t make payment with this methods');
        return;
    }
    const paymentResponse = yield paymentRequest.show();
    console.log(paymentResponse);
    const validationResult = true;
    if (validationResult) {
        paymentResponse.complete('success');
    }
    else {
        paymentResponse.complete('fail');
    }
});
payButton === null || payButton === void 0 ? void 0 : payButton.addEventListener('click', onClick);
