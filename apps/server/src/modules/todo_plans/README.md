# Plan Module

You can now model subscriptions more flexibly using the Prices API. It replaces the Plans API and is backwards
compatible to simplify your migration.

Plans define the base price, currency, and billing cycle for recurring purchases of products. Products help you track
inventory or provisioning, and plans help you track pricing. Different physical goods or levels of service should be
represented by products, and pricing options should be represented by plans. This approach lets you change prices
without having to change your provisioning scheme.

For example, you might have a single “gold” product that has plans for $10/month, $100/year, €9/month, and €90/year.

Related guides: Set up a subscription and more about products and prices.

- https://stripe.com/docs/api/plans