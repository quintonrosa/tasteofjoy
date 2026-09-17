const WHATSAPP = "59995253305";
const TEST_ACCOUNT = "27015601";

const products = [
  {
    category: "Original cookies",
    groups: [
      {
        title: "Mini Bites",
        subtitle: "Less than 2 inches",
        items: [
          {
            id: "mini50",
            name: "Mini Bites",
            size: "Less than 2 inches",
            qty: 50,
            price: 22.5
          },
          {
            id: "mini100",
            name: "Mini Bites",
            size: "Less than 2 inches",
            qty: 100,
            price: 45
          }
        ]
      },
      {
        title: "Regular",
        subtitle: "2 inches",
        items: [
          {
            id: "reg25",
            name: "Original Cookies",
            size: "Regular — 2 inches",
            qty: 25,
            price: 15
          },
          {
            id: "reg50",
            name: "Original Cookies",
            size: "Regular — 2 inches",
            qty: 50,
            price: 30
          },
          {
            id: "reg100",
            name: "Original Cookies",
            size: "Regular — 2 inches",
            qty: 100,
            price: 55
          }
        ]
      },
      {
        title: "Medium",
        subtitle: "3 inches",
        items: [
          {
            id: "med25",
            name: "Original Cookies",
            size: "Medium — 3 inches",
            qty: 25,
            price: 21.25
          },
          {
            id: "med50",
            name: "Original Cookies",
            size: "Medium — 3 inches",
            qty: 50,
            price: 42.5
          },
          {
            id: "med100",
            name: "Original Cookies",
            size: "Medium — 3 inches",
            qty: 100,
            price: 85
          }
        ]
      },
      {
        title: "Large",
        subtitle: "4 inches",
        items: [
          {
            id: "large25",
            name: "Original Cookies",
            size: "Large — 4 inches",
            qty: 25,
            price: 28.75
          },
          {
            id: "large50",
            name: "Original Cookies",
            size: "Large — 4 inches",
            qty: 50,
            price: 57.5
          },
          {
            id: "large100",
            name: "Original Cookies",
            size: "Large — 4 inches",
            qty: 100,
            price: 115
          }
        ]
      },
      {
        title: "X-large",
        subtitle: "5 inches",
        items: [
          {
            id: "xl25",
            name: "Original Cookies",
            size: "X-large — 5 inches",
            qty: 25,
            price: 37.5
          },
          {
            id: "xl50",
            name: "Original Cookies",
            size: "X-large — 5 inches",
            qty: 50,
            price: 75
          },
          {
            id: "xl100",
            name: "Original Cookies",
            size: "X-large — 5 inches",
            qty: 100,
            price: 150
          }
        ]
      },
      {
        title: "2 X-large",
        subtitle: "6 inches",
        items: [
          {
            id: "xxl25",
            name: "Original Cookies",
            size: "2 X-large — 6 inches",
            qty: 25,
            price: 56.25
          },
          {
            id: "xxl50",
            name: "Original Cookies",
            size: "2 X-large — 6 inches",
            qty: 50,
            price: 112.5
          },
          {
            id: "xxl100",
            name: "Original Cookies",
            size: "2 X-large — 6 inches",
            qty: 100,
            price: 225
          }
        ]
      },
      {
        title: "Numbers and letters",
        subtitle: "Regular size",
        items: [
          {
            id: "letters25",
            name: "Numbers and letters",
            size: "Regular size",
            qty: 25,
            price: 16.25
          },
          {
            id: "letters50",
            name: "Numbers and letters",
            size: "Regular size",
            qty: 50,
            price: 32.5
          },
          {
            id: "letters100",
            name: "Numbers and letters",
            size: "Regular size",
            qty: 100,
            price: 65
          }
        ]
      }
    ]
  },
  {
    category: "Chocolate chip",
    groups: [
      {
        title: "Regular",
        subtitle: "2 inches",
        items: [
          {
            id: "chip25",
            name: "Chocolate chip cookies",
            size: "Regular — 2 inches",
            qty: 25,
            price: 21.25
          },
          {
            id: "chip50",
            name: "Chocolate chip cookies",
            size: "Regular — 2 inches",
            qty: 50,
            price: 42.5
          },
          {
            id: "chip100",
            name: "Chocolate chip cookies",
            size: "Regular — 2 inches",
            qty: 100,
            price: 85
          }
        ]
      }
    ]
  }
];

let cart = [];
let paymentReference = "";

function byId(id) {
  return document.getElementById(id);
}

function money(value) {
  return `XCG ${Number(value).toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pad(number) {
  return String(number).padStart(2, "0");
}

function localDateString(date = new Date()) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-");
}

function addDays(date, days) {
  const result = new Date(date);

  result.setDate(
    result.getDate() + days
  );

  return result;
}

function generatePaymentReference() {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "";

  for (let index = 0; index < 6; index += 1) {
    const randomIndex =
      Math.floor(
        Math.random() * alphabet.length
      );

    code += alphabet[randomIndex];
  }

  return `TOJ-${code}`;
}

function createOrderReference() {
  paymentReference =
    generatePaymentReference();

  byId("paymentReference")
    .textContent =
    paymentReference;
}

function getSelectedPaymentMethod() {
  const selected =
    document.querySelector(
      'input[name="payment"]:checked'
    );

  return selected
    ? selected.value
    : "bank";
}

function bankProofIsRequired() {
  return (
    getSelectedPaymentMethod() === "bank"
  );
}

function hasPaymentProof() {
  const proof =
    byId("proof");

  return Boolean(
    proof &&
    proof.files &&
    proof.files.length > 0
  );
}

function validatePaymentProof() {
  if (
    bankProofIsRequired() &&
    !hasPaymentProof()
  ) {
    byId("proof")
      .setCustomValidity(
        "Payment proof is required before sending the order to WhatsApp."
      );

    byId("proof")
      .reportValidity();

    byId("formMessage")
      .textContent =
      "Please upload your payment proof before continuing.";

    byId("formMessage")
      .className =
      "notice error";

    return false;
  }

  byId("proof")
    .setCustomValidity("");

  return true;
}

function updatePaymentProofRequirement() {
  const required =
    bankProofIsRequired();

  byId("proof")
    .required =
    required;

  byId("proofRequirementMessage")
    .classList
    .toggle(
      "hidden",
      !required
    );

  if (!required) {
    byId("proof")
      .setCustomValidity("");
  }
}

function formatDateInWords(value) {
  if (!value) {
    return "No date selected";
  }

  const parts =
    value.split("-").map(Number);

  if (
    parts.length !== 3 ||
    parts.some(Number.isNaN)
  ) {
    return "No date selected";
  }

  const date = new Date(
    parts[0],
    parts[1] - 1,
    parts[2],
    12,
    0,
    0,
    0
  );

  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  ).format(date);
}

function setMinimumDate() {
  const minimumDate =
    localDateString(
      addDays(new Date(), 4)
    );

  byId("orderDate")
    .min =
    minimumDate;

  byId("dateMinimumMessage")
    .textContent =
    `The earliest available date is ${
      formatDateInWords(minimumDate)
    }.`;

  updateDateDisplay();
}

function dateIsValid() {
  const value =
    byId("orderDate").value;

  const minimumDate =
    byId("orderDate").min;

  return Boolean(
    value &&
    minimumDate &&
    value >= minimumDate
  );
}

function updateDateDisplay() {
  byId("selectedDateWords")
    .textContent =
    formatDateInWords(
      byId("orderDate").value
    );
}

function renderMenu() {
  const menu =
    byId("menu");

  let html = "";

  products.forEach(category => {
    html += `
      <div class="menu-category">
        <h3 class="category-title">
          ${escapeHtml(category.category)}
        </h3>
    `;

    category.groups.forEach(group => {
      html += `
        <details class="cookie-group">
          <summary>
            <span>
              ${escapeHtml(group.title)}
            </span>

            <small>
              ${escapeHtml(group.subtitle)}
            </small>
          </summary>

          <p class="mobile-scroll-note">
            Swipe left or right to view all cookie options.
          </p>

          <div class="cookie-table-wrap">
            <table class="cookie-table">
              <caption>
                ${escapeHtml(category.category)} —
                ${escapeHtml(group.title)}
              </caption>

              <thead>
                <tr>
                  <th scope="col">
                    Quantity
                  </th>

                  <th scope="col">
                    Price
                  </th>

                  <th scope="col">
                    Add
                  </th>
                </tr>
              </thead>

              <tbody>
      `;

      group.items.forEach(item => {
        html += `
          <tr>
            <td>
              ${item.qty} cookies
            </td>

            <td>
              ${money(item.price)}
            </td>

            <td>
              <button
                type="button"
                class="add-package-button"
                data-product-id="${item.id}">

                Add
              </button>
            </td>
          </tr>
        `;
      });

      html += `
              </tbody>
            </table>
          </div>
        </details>
      `;
    });

    html += `
      </div>
    `;
  });

  menu.innerHTML =
    html;

  menu
    .querySelectorAll(
      ".add-package-button"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          addToCart(
            button.dataset.productId
          );
        }
      );
    });
}

function findProduct(id) {
  for (const category of products) {
    for (const group of category.groups) {
      for (const item of group.items) {
        if (item.id === id) {
          return item;
        }
      }
    }
  }

  return null;
}

function addToCart(id) {
  const product =
    findProduct(id);

  if (!product) {
    return;
  }

  const existing =
    cart.find(
      item => item.id === id
    );

  if (existing) {
    existing.count += 1;
  } else {
    cart.push({
      ...product,
      count: 1
    });
  }

  refreshCart();
}

function increaseQuantity(id) {
  const item =
    cart.find(
      line => line.id === id
    );

  if (item) {
    item.count += 1;
    refreshCart();
  }
}

function decreaseQuantity(id) {
  const item =
    cart.find(
      line => line.id === id
    );

  if (!item) {
    return;
  }

  if (item.count <= 1) {
    removeFromCart(id);
    return;
  }

  item.count -= 1;
  refreshCart();
}

function removeFromCart(id) {
  cart =
    cart.filter(
      item => item.id !== id
    );

  refreshCart();
}

function packageCount() {
  return cart.reduce(
    (sum, item) =>
      sum + item.count,
    0
  );
}

function cookieSubtotal() {
  return cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.count,
    0
  );
}

function deliveryFee() {
  const fulfillment =
    document.querySelector(
      'input[name="fulfillment"]:checked'
    );

  if (
    !fulfillment ||
    fulfillment.value !== "delivery"
  ) {
    return 0;
  }

  const district =
    byId("district").value;

  if (
    district === "1" ||
    district === "2"
  ) {
    return 7.5;
  }

  if (district === "3") {
    return 15;
  }

  return 0;
}

function total() {
  return (
    cookieSubtotal() +
    deliveryFee()
  );
}

function renderCart() {
  if (!cart.length) {
    byId("cart").innerHTML = `
      <p class="muted">
        Your order is empty.
      </p>
    `;

    return;
  }

  byId("cart").innerHTML =
    cart
      .map(item => `
        <div class="order-line">
          <div>
            <b>
              ${escapeHtml(item.name)}
            </b>

            <small>
              ${escapeHtml(item.size)}
              × ${item.count} package(s)
            </small>

            <small>
              ${item.qty * item.count}
              cookies
            </small>

            <div class="quantity-controls">
              <button
                type="button"
                class="decrease-button"
                data-product-id="${item.id}"
                aria-label="Decrease quantity">

                −
              </button>

              <span class="quantity-number">
                ${item.count}
              </span>

              <button
                type="button"
                class="increase-button"
                data-product-id="${item.id}"
                aria-label="Increase quantity">

                +
              </button>
            </div>

            <button
              type="button"
              class="remove remove-button"
              data-product-id="${item.id}">

              Remove
            </button>
          </div>

          <strong>
            ${money(
              item.price *
              item.count
            )}
          </strong>
        </div>
      `)
      .join("");

  byId("cart")
    .querySelectorAll(
      ".decrease-button"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          decreaseQuantity(
            button.dataset.productId
          );
        }
      );
    });

  byId("cart")
    .querySelectorAll(
      ".increase-button"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          increaseQuantity(
            button.dataset.productId
          );
        }
      );
    });

  byId("cart")
    .querySelectorAll(
      ".remove-button"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          removeFromCart(
            button.dataset.productId
          );
        }
      );
    });
}

function updateTotals() {
  const count =
    packageCount();

  byId("pageOrderTotal")
    .textContent =
    money(total());

  byId("stickyItems")
    .textContent =
    `${count} ${
      count === 1
        ? "package"
        : "packages"
    }`;

  byId("stickyTotal")
    .textContent =
    `Total: ${money(total())}`;
}

function updateSummary() {
  const customerName =
    byId("customerName")
      .value
      .trim();

  const phone =
    byId("phone")
      .value
      .trim();

  byId("submitOrder")
    .disabled =
    !(
      cart.length &&
      dateIsValid() &&
      customerName &&
      phone &&
      byId("acceptPolicy").checked
    );
}

function refreshCart() {
  renderCart();
  updateTotals();
  updateSummary();
}

function toggleFields() {
  const packaging =
    document.querySelector(
      'input[name="packaging"]:checked'
    ).value;

  const fulfillment =
    document.querySelector(
      'input[name="fulfillment"]:checked'
    ).value;

  const payment =
    getSelectedPaymentMethod();

  byId("specialRequest")
    .classList
    .toggle(
      "hidden",
      packaging !== "other"
    );

  byId("deliveryFields")
    .classList
    .toggle(
      "hidden",
      fulfillment !== "delivery"
    );

  byId("bankFields")
    .classList
    .toggle(
      "hidden",
      payment !== "bank"
    );

  byId("cashNotice")
    .classList
    .toggle(
      "hidden",
      payment !== "cash"
    );

  updatePaymentProofRequirement();
  updateTotals();
  updateSummary();
}

function buildConfirmationSummary() {
  const lines =
    cart
      .map(item => `
        <div class="confirmation-summary-line">
          <span>
            ${escapeHtml(item.name)}<br>

            <small>
              ${escapeHtml(item.size)}
              × ${item.count}
              (${item.qty * item.count}
              cookies)
            </small>
          </span>

          <strong>
            ${money(
              item.price *
              item.count
            )}
          </strong>
        </div>
      `)
      .join("");

  byId("confirmationSummary")
    .innerHTML = `
      <div class="confirmation-summary-line">
        <span>
          Payment reference
        </span>

        <strong>
          ${paymentReference}
        </strong>
      </div>

      ${lines}

      <div class="confirmation-summary-line">
        <span>
          Selected date
        </span>

        <strong>
          ${formatDateInWords(
            byId("orderDate").value
          )}
        </strong>
      </div>

      <div class="confirmation-summary-line">
        <span>
          Additional delivery information
        </span>

        <strong>
          ${
            byId("dateNote")
              .value
              .trim() ||
            "None"
          }
        </strong>
      </div>

      <div class="confirmation-summary-line">
        <strong>
          Total
        </strong>

        <strong>
          ${money(total())}
        </strong>
      </div>
    `;
}

function openConfirmationModal() {
  const form =
    byId("orderForm");

  if (!cart.length) {
    byId("formMessage")
      .textContent =
      "Please add at least one cookie package.";

    byId("formMessage")
      .className =
      "notice error";

    byId("cart").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;
  }

  if (!dateIsValid()) {
    byId("formMessage")
      .textContent =
      `Please choose a date on or after ${
        formatDateInWords(
          byId("orderDate").min
        )
      }.`;

    byId("formMessage")
      .className =
      "notice error";

    byId("orderDate")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    byId("orderDate")
      .focus();

    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!validatePaymentProof()) {
    return;
  }

  buildConfirmationSummary();

  byId("confirmationModal")
    .classList
    .remove("hidden");

  byId("confirmationBackdrop")
    .classList
    .remove("hidden");

  document.body.classList.add(
    "modal-open"
  );
}

function closeConfirmationModal() {
  byId("confirmationModal")
    .classList
    .add("hidden");

  byId("confirmationBackdrop")
    .classList
    .add("hidden");

  document.body.classList.remove(
    "modal-open"
  );
}

function buildWhatsAppMessage() {
  if (!validatePaymentProof()) {
    return "";
  }

  const fulfillment =
    document.querySelector(
      'input[name="fulfillment"]:checked'
    ).value;

  const payment =
    getSelectedPaymentMethod();

  const packaging =
    document.querySelector(
      'input[name="packaging"]:checked'
    ).value;

  const lines =
    cart
      .map(item =>
        `${item.name} — ` +
        `${item.size} × ` +
        `${item.count} package(s), ` +
        `${item.qty * item.count} cookies: ` +
        `${money(
          item.price *
          item.count
        )}`
      )
      .join("\n");

  const paymentDetails =
    payment === "bank"
      ? `Bank transfer
Bank: MCB
Account: ${TEST_ACCOUNT}
Payment reference: ${paymentReference}
Payment proof: Uploaded`
      : `Cash on delivery
Payment reference: ${paymentReference}
Amount due: ${money(total())}`;

  return `Hello Taste of Joy! I would like to place an order.

PAYMENT REFERENCE
${paymentReference}

CUSTOMER
Name: ${byId("customerName").value.trim()}
Phone: ${byId("phone").value.trim()}
Email: ${
    byId("email").value.trim() ||
    "Not provided"
  }

ORDER
${lines}

PACKAGING
${
    packaging === "standard"
      ? "Standard packaging"
      : byId("specialRequestText")
          .value
          .trim() ||
        "Special request"
  }

TOTAL
${money(total())}

FULFILLMENT
${
    fulfillment === "pickup"
      ? "Pickup from Grote Berg, Kaya H11"
      : `Delivery district: ${
          byId("district").value
        }
Address: ${
          byId("address").value.trim()
        }
Instructions: ${
          byId("instructions")
            .value
            .trim() ||
          "None"
        }`
  }

REQUESTED DATE
${formatDateInWords(
    byId("orderDate").value
  )}

ADDITIONAL DELIVERY INFORMATION
${
    byId("dateNote")
      .value
      .trim() ||
    "None"
  }

PAYMENT
${paymentDetails}

Thank you for your order!`;
}

function sendOrderToWhatsApp() {
  const form =
    byId("orderForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!validatePaymentProof()) {
    return;
  }

  const message =
    buildWhatsAppMessage();

  if (!message) {
    return;
  }

  const url =
    `https://wa.me/${WHATSAPP}?text=` +
    encodeURIComponent(message);

  window.location.href =
    url;

  closeConfirmationModal();

  byId("formMessage")
    .textContent =
    "Your order is ready to send to WhatsApp.";

  byId("formMessage")
    .className =
    "notice";
}

function startApp() {
  createOrderReference();
  setMinimumDate();
  renderMenu();
  refreshCart();
  updateDateDisplay();
  toggleFields();

  byId("orderDate")
    .addEventListener(
      "change",
      () => {
        updateDateDisplay();
        updateSummary();
      }
    );

  byId("acceptPolicy")
    .addEventListener(
      "change",
      updateSummary
    );

  byId("district")
    .addEventListener(
      "change",
      () => {
        updateTotals();
        updateSummary();
      }
    );

  byId("proof")
    .addEventListener(
      "change",
      () => {
        byId("proof")
          .setCustomValidity("");

        byId("formMessage")
          .textContent = "";

        updateSummary();
      }
    );

  document
    .querySelectorAll(
      "input[name='packaging'], " +
      "input[name='fulfillment'], " +
      "input[name='payment']"
    )
    .forEach(input => {
      input.addEventListener(
        "change",
        toggleFields
      );
    });

  document
    .querySelectorAll(
      "input, textarea, select"
    )
    .forEach(element => {
      element.addEventListener(
        "input",
        updateSummary
      );

      element.addEventListener(
        "change",
        updateSummary
      );
    });

  byId("submitOrder")
    .addEventListener(
      "click",
      openConfirmationModal
    );

  byId("stickyReview")
    .addEventListener(
      "click",
      openConfirmationModal
    );

  byId("confirmationClose")
    .addEventListener(
      "click",
      closeConfirmationModal
    );

  byId("confirmationBackdrop")
    .addEventListener(
      "click",
      closeConfirmationModal
    );

  byId("editOrder")
    .addEventListener(
      "click",
      closeConfirmationModal
    );

  byId("confirmOrder")
    .addEventListener(
      "click",
      sendOrderToWhatsApp
    );
}

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    startApp,
    { once: true }
  );
} else {
  startApp();
}
