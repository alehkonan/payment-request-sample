function sumStrings(prev: string, curr: string): string {
  const sumNumber = parseFloat(prev) + parseFloat(curr);
  return sumNumber.toFixed(2).toString();
}

export const cart: PaymentItem[] = [
  {
    label: '1st item',
    amount: {
      currency: 'USD',
      value: '10.00',
    },
  },
  {
    label: '2st item',
    amount: {
      currency: 'USD',
      value: '23.00',
    },
  },
  {
    label: 'discount',
    amount: {
      currency: 'USD',
      value: '-5.00',
    },
  },
];

export const calculateTotal = (cart: PaymentItem[]): PaymentItem =>
  cart.reduce(
    (prev, acc) => {
      return {
        ...prev,
        amount: {
          ...prev.amount,
          value: sumStrings(prev.amount.value, acc.amount.value),
        },
      };
    },
    {
      label: 'Total',
      amount: {
        currency: 'USD',
        value: '0.00',
      },
    }
  );
