const productPageLocators = {
  pageTitle: ".title",
  appLogo: ".app_logo",
  burgerMenuButton: "#react-burger-menu-btn",
  shoppingCartLink: ".shopping_cart_link",
  shoppingCartBadge: ".shopping_cart_badge",

  productSortDropdown: '[data-test="product_sort_container"]',
  inventoryList: ".inventory_list",
  inventoryItems: ".inventory_item",
  inventoryItemName: ".inventory_item_name",
  inventoryItemImage: ".inventory_item_img",
  inventoryItemDescription: ".inventory_item_desc",
  inventoryItemPrice: ".inventory_item_price",

  addToCartButton: (productName) => {
    const slug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `[data-test="add-to-cart-${slug}"]`;
  },

  removeButton: (productName) => {
    const slug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `[data-test="remove-${slug}"]`;
  },

  productNameText: (productName) =>
    `//div[contains(@class, 'inventory_item_name') and normalize-space()="${productName}"]`,

  productCard: (productName) =>
    `//div[contains(@class, 'inventory_item') and .//div[contains(@class, 'inventory_item_name') and normalize-space()="${productName}"]]`,
};

module.exports = productPageLocators;
