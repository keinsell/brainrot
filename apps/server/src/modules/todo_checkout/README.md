# Checkout

Checkout is a module that allows users to pay for cart and place order.

- Checkout takes a `Cart` and refreshes calculation of cart to get latest possible price to avoid miscalculations, then
  it uses provided `PaymentDetails` and `ShippingAddress` to create `Order` and `Payment` entities.
- During Checkout process information should be snapshooted to avoid data inconsistency after future changes
  in `Product` entity.