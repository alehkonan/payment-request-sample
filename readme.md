# Basic usage of Payment Request API

## It is a native API that is used for payments without checkout forms and pages

### Support

![support](/assets/PR%20API%20support.JPG)

It has full support on Safari, and almost full support on Google Chrome, but you can`t use it on stable version of Firefox

---

### PaymentRequest interface

```
var PaymentRequest: new (methodData: PaymentMethodData[], details: PaymentDetailsInit) => PaymentRequest
```

_methodData_ is an array of methods that can be used. There is only one registered standardized payment method identifier: 'basic-card', but you can also use URL-based payment method identifiers, for example:

- https://apple.com/apple-pay (for Apple Pay)
- https://google.com/pay (for Google Pay)
  > for using this interfaces you should have a merchant ID and be registed on their site as a merchant

_details_ is information about order details, total price and other information like shipping

---

### How to connect

Full apple pay guide you can find on [official apple documentation](https://medium.com/analytics-vidhya/how-to-create-a-readme-md-file-8fb2e8ce24e3)

Google Pay guide in on there developer site [here](https://developers.google.com/pay/api/web/guides/paymentrequest/tutorial)

Samsung integration you can find [here](https://developer.samsung.com/internet/android/web-payments-integration-guide.html#Overview)
