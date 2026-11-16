const checkoutPageLocator = {
  // Checkout: Your Information
  checkoutTitle: ".title",
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorMessage: '[data-test="error"]',

  // Checkout: Overview
  checkoutItems: ".cart_item",
  itemName: ".inventory_item_name",
  itemDescription: ".inventory_item_desc",
  itemPrice: ".inventory_item_price",
  itemQuantity: ".cart_quantity",
  paymentInformation: ".summary_value_label",
  shippingInformation: ".summary_value_label",
  itemTotal: ".summary_subtotal_label",
  tax: ".summary_tax_label",
  orderTotal: ".summary_total_label",
  finishButton: '[data-test="finish"]',

  // Checkout: Complete
  completionHeader: ".complete-header",
  completionText: ".complete-text",
  backToProductsButton: '[data-test="back-to-products"]',
};

module.exports = checkoutPageLocator;
