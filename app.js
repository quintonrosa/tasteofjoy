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

const $ = id =>
  document.getElementById(id);

function money(value) {
  return `XCG ${value.toFixed(2)}`;
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

function localDateString(
  date = new Date()
) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-");
}

function addDays(date, numberOfDays) {
  const result =
    new Date(date);

  result.setDate(
    result.getDate() +
    numberOfDays
  );

  return result;
}

function generatePaymentReference() {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const values =
    new Uint32Array(6);

  if (
    window.crypto &&
    typeof window.crypto.getRandomValues ===
      "function"
  ) {
    window.crypto.getRandomValues(
      values
    );
  } else {
    for (
      let index = 0;
      index < values.length;
      index += 1
    ) {
      values[index] =
        Math.floor(
          Math.random() *
          alphabet.length
        );
    }
  }

  let code = "";

  for (
    let index = 0;
    index < 6;
    index += 1
  ) {
    code +=
      alphabet[
        values[index] %
          alphabet.length
      ];
  }

  return `TOJ-${code}`;
}

function createOrderReference() {
  paymentReference =
    generatePaymentReference();

  $("paymentReference").textContent =
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
    getSelectedPaymentMethod() ===
    "bank"
  );
}

function hasPaymentProof() {
  return (
    $("proof") &&
    $("proof").files &&
    $("proof").files.length > 0
  );
}

function validatePaymentProof() {
  if (
    bankProofIsRequired() &&
    !hasPaymentProof()
  ) {
    $("proof").setCustomValidity(
      "Payment proof is required before sending the order to WhatsApp."
    );

    $("proof").reportValidity();

    $("formMessage").textContent =
      "Please upload your payment proof before continuing.";

    $("formMessage").className =
      "notice error";

    return false;
  }

  $("proof").setCustomValidity("");

  return true;
}

function updatePaymentProofRequirement() {
  const required =
    bankProofIsRequired();

  $("proof").required =
    required;

  $("proofRequirementMessage")
    .classList
    .toggle(
      "hidden",
      !required
    );

  if (!required) {
    $("proof").setCustomValidity("");
  }

  updateSummary();
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

  const date =
    new Date(
      parts[0],
      parts[1] - 1,
      parts[2],
      12,
      0,
      0,
      0
    );

  if (Number.isNaN(date.getTime())) {
    return "No date selected";
  }

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
  /*
    The order date counts as day one.

    Example:
    Order made on September 17
    September 18 = day two
    September 19 = day three
    September 20 = day four
    September 21 = first available date

    Therefore, the minimum date is four calendar
    days after the date the order is made.
  */

  const minimumDate =
    localDateString(
      addDays(new Date(), 4)
    );

  $("orderDate").min =
    minimumDate;

  $("dateMinimumMessage").textContent =
    `The earliest available date is ${
      formatDateInWords(
        minimumDate
      )
    }.`;

  if (
    $("orderDate").value &&
    $("orderDate").value <
      minimumDate
  ) {
    $("orderDate").value = "";
  }

  updateDateDisplay();
}

function dateIsValid() {
  const value =
    $("orderDate").value;

  const minimumDate =
    $("orderDate").min;

  return Boolean(
    value &&
    minimumDate &&
    value >= minimumDate
  );
}

function updateDateDisplay() {
  $("selectedDateWords").textContent =
    formatDateInWords(
      $("orderDate").value
    );
}

function renderMenu() {
  $("menu").innerHTML =
    products
      .map(category => `
        <div class="menu-category">
          <h3 class="category-title">
            ${escapeHtml(
              category.category
            )}
          </h3>

          ${category.groups
            .map(group => `
              <details class="cookie-group">
                <summary>
                  <span>
                    ${escapeHtml(
                      group.title
                    )}
                  </span>

                  <small>
                    ${escapeHtml(
                      group.subtitle
                    )}
                  </small>
                </summary>

                <p class="mobile-scroll-note">
                  Swipe left or right to view all cookie options.
                </p>

                <div class="cookie-table-wrap">
                  <table class="cookie-table">
                    <caption>
                      ${escapeHtml(
                        category.category
                      )} —
                      ${escapeHtml(
                        group.title
                      )}
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
                      ${group.items
                        .map(item => `
                          <tr>
                            <td>
                              ${item.qty} cookies
                            </td>

                            <td>
                              ${money(
                                item.price
                              )}
                            </td>

                            <td>
                              <button
                                type="button"
                                aria-label="Add ${
                                  item.qty
                                } cookies"
                                onclick="addToCart('${item.id}')">

                                Add
                              </button>
                            </td>
                          </tr>
                        `)
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </details>
            `)
            .join("")}
        </div>
      `)
      .join("");
}

function findProduct(id) {
  return products
    .flatMap(
      category =>
        category.groups
    )
    .flatMap(
      group => group.items
    )
    .find(
      item => item.id === id
    );
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

  $("cart").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
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
    ).value;

  if (
    fulfillment !==
    "delivery"
  ) {
    return 0;
  }

  const district =
    $("district").value;

  if (
    district === "1" ||
    district === "2"
  ) {
    return 7.5;
  }

  if (
    district === "3"
  ) {
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
    $("cart").innerHTML = `
      <p class="muted">
        Your order is empty.
      </p>
    `;

    return;
  }

  $("cart").innerHTML =
    cart
      .map(item => `
        <div class="order-line">
          <div>
            <b>
              ${escapeHtml(
                item.name
              )}
            </b>

            <small>
              ${escapeHtml(
                item.size
              )} × ${item.count} package(s)
            </small>

            <small>
              ${item.qty * item.count}
              cookies
            </small>

            <div class="quantity-controls">
              <button
                type="button"
                aria-label="Decrease quantity"
                onclick="decreaseQuantity('${item.id}')">

                −
              </button>

              <span class="quantity-number">
                ${item.count}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onclick="increaseQuantity('${item.id}')">

                +
              </button>
            </div>

            <button
              class="remove"
              type="button"
              onclick="removeFromCart('${item.id}')">

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
}

function updateTotals() {
  $("pageOrderTotal").textContent =
    money(total());

  $("stickyItems").textContent =
    `${packageCount()} ${
      packageCount() === 1
        ? "package"
        : "packages"
    }`;

  $("stickyTotal").textContent =
    `Total: ${money(total())}`;
}

function updateSummary() {
  const customerName =
    $("customerName").value.trim();

  const phone =
    $("phone").value.trim();

  $("submitOrder").disabled =
    !(
      cart.length &&
      dateIsValid() &&
      customerName &&
      phone &&
      $("acceptPolicy").checked
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

  $("specialRequest")
    .classList
    .toggle(
      "hidden",
      packaging !== "other"
    );

  $("deliveryFields")
    .classList
    .toggle(
      "hidden",
      fulfillment !== "delivery"
    );

  $("bankFields")
    .classList
    .toggle(
      "hidden",
      payment !== "bank"
    );

  $("cashNotice")
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
            ${escapeHtml(
              item.name
            )}<br>

            <small>
              ${escapeHtml(
                item.size
              )} × ${item.count}
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

  $("confirmationSummary").innerHTML = `
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
          $("orderDate").value
        )}
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
    $("orderForm");

  if (!cart.length) {
    $("formMessage").textContent =
      "Please add at least one cookie package.";

    $("formMessage").className =
      "notice error";

    $("cart").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return;
  }

  if (!dateIsValid()) {
    $("formMessage").textContent =
      `Please choose a date on or after ${
        formatDateInWords(
          $("orderDate").min
        )
      }.`;

    $("formMessage").className =
      "notice error";

    $("orderDate").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    $("orderDate").focus();

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

  $("confirmationModal")
    .classList
    .remove("hidden");

  $("confirmationBackdrop")
    .classList
    .remove("hidden");

  document.body.classList.add(
    "modal-open"
  );
}

function closeConfirmationModal() {
  $("confirmationModal")
    .classList
    .add("hidden");

  $("confirmationBackdrop")
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
Name: ${$("customerName").value.trim()}
Phone: ${$("phone").value.trim()}
Email: ${
    $("email").value.trim() ||
    "Not provided"
  }

ORDER
${lines}

PACKAGING
${
    packaging === "standard"
      ? "Standard packaging"
      : $("specialRequestText").value.trim() ||
        "Special request"
  }

TOTAL
${money(total())}

FULFILLMENT
${
    fulfillment === "pickup"
      ? "Pickup from Grote Berg, Kaya H11"
      : `Delivery district: ${$("district").value}
Address: ${$("address").value.trim()}
Instructions: ${
          $("instructions").value.trim() ||
          "None"
        }`
  }

REQUESTED DATE
${formatDateInWords(
    $("orderDate").value
  )}

DATE NOTE
${
    $("dateNote").value.trim() ||
    "None"
  }

PAYMENT
${paymentDetails}

Thank you for your order!`;
}

function sendOrderToWhatsApp() {
  const form =
    $("orderForm");

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

  $("formMessage").textContent =
    "Your order is ready to send to WhatsApp.";

  $("formMessage").className =
    "notice";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    createOrderReference();
    setMinimumDate();

    $("orderDate").addEventListener(
      "change",
      () => {
        updateDateDisplay();
        updateSummary();
      }
    );

    $("acceptPolicy").addEventListener(
      "change",
      updateSummary
    );

    $("district").addEventListener(
      "change",
      () => {
        updateTotals();
        updateSummary();
      }
    );

    $("proof").addEventListener(
      "change",
      () => {
        $("proof").setCustomValidity("");
        $("formMessage").textContent = "";
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

    $("submitOrder").addEventListener(
      "click",
      openConfirmationModal
    );

    $("stickyReview").addEventListener(
      "click",
      openConfirmationModal
    );

    $("confirmationClose").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("confirmationBackdrop").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("editOrder").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("confirmOrder").addEventListener(
      "click",
      sendOrderToWhatsApp
    );

    renderMenu();
    refreshCart();
    updateDateDisplay();
    toggleFields();
  }
);
          },
          {
            id: "med50",
            name: "Original cookies",
            size: "Medium — 3 inches",
            qty: 50,
            price: 42.5
          },
          {
            id: "med100",
            name: "Original cookies",
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
            name: "Original cookies",
            size: "Large — 4 inches",
            qty: 25,
            price: 28.75
          },
          {
            id: "large50",
            name: "Original cookies",
            size: "Large — 4 inches",
            qty: 50,
            price: 57.5
          },
          {
            id: "large100",
            name: "Original cookies",
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
            name: "Original cookies",
            size: "X-large — 5 inches",
            qty: 25,
            price: 37.5
          },
          {
            id: "xl50",
            name: "Original cookies",
            size: "X-large — 5 inches",
            qty: 50,
            price: 75
          },
          {
            id: "xl100",
            name: "Original cookies",
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
            name: "Original cookies",
            size: "2 X-large — 6 inches",
            qty: 25,
            price: 56.25
          },
          {
            id: "xxl50",
            name: "Original cookies",
            size: "2 X-large — 6 inches",
            qty: 50,
            price: 112.5
          },
          {
            id: "xxl100",
            name: "Original cookies",
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
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 25,
            price: 21.25
          },
          {
            id: "chip50",
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 50,
            price: 42.5
          },
          {
            id: "chip100",
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 100,
            price: 85
          }
        ]
      }
    ]
  }
];

const WHATSAPP_COUNTRY_NUMBER = WHATSAPP;

let cart = [];
let paymentReference = "";

const $ = id => document.getElementById(id);

function money(value) {
  return `XCG ${value.toFixed(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function generatePaymentReference() {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const values = new Uint32Array(6);

  if (
    window.crypto &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(values);
  } else {
    for (let index = 0; index < values.length; index += 1) {
      values[index] = Math.floor(
        Math.random() * alphabet.length
      );
    }
  }

  let code = "";

  for (let index = 0; index < 6; index += 1) {
    code += alphabet[values[index] % alphabet.length];
  }

  return `TOJ-${code}`;
}

function createOrderReference() {
  paymentReference = generatePaymentReference();

  if ($("paymentReference")) {
    $("paymentReference").textContent = paymentReference;
  }
}

function getSelectedPaymentMethod() {
  const selected = document.querySelector(
    'input[name="payment"]:checked'
  );

  return selected ? selected.value : "bank";
}

function bankProofIsRequired() {
  return getSelectedPaymentMethod() === "bank";
}

function hasPaymentProof() {
  return (
    $("proof") &&
    $("proof").files &&
    $("proof").files.length > 0
  );
}

function validatePaymentProof() {
  if (bankProofIsRequired() && !hasPaymentProof()) {
    $("proof").setCustomValidity(
      "Payment proof is required before sending the order to WhatsApp."
    );

    $("proof").reportValidity();

    $("formMessage").textContent =
      "Please upload your payment proof before continuing.";

    $("formMessage").className = "notice error";

    return false;
  }

  $("proof").setCustomValidity("");

  return true;
}

function updatePaymentProofRequirement() {
  const required = bankProofIsRequired();

  $("proof").required = required;

  $("proofRequirementMessage")
    .classList
    .toggle("hidden", !required);

  if (!required) {
    $("proof").setCustomValidity("");
  }

  updateSummary();
}

function ordinal(day) {
  const remainder = day % 100;

  if (remainder >= 11 && remainder <= 13) {
    return `${day}th`;
  }

  if (day % 10 === 1) {
    return `${day}st`;
  }

  if (day % 10 === 2) {
    return `${day}nd`;
  }

  if (day % 10 === 3) {
    return `${day}rd`;
  }

  return `${day}th`;
}

function formatDateInWords(value) {
  if (!value) {
    return "No date selected";
  }

  const date = new Date(`${value}T00:00:00`);

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long"
  });

  const month = date.toLocaleDateString("en-US", {
    month: "long"
  });

  return `${weekday}, ${month} ${ordinal(date.getDate())}`;
}

function renderMenu() {
  $("menu").innerHTML = products
    .map(category => `
      <div class="menu-category">
        <h3 class="category-title">
          ${escapeHtml(category.category)}
        </h3>

        ${category.groups
          .map(group => `
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
                      <th>Cookie</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    ${group.items
                      .map(item => `
                        <tr>
                          <td>
                            ${escapeHtml(item.name)}
                          </td>

                          <td>
                            ${escapeHtml(item.size)}
                          </td>

                          <td>
                            ${item.qty}
                          </td>

                          <td>
                            ${money(item.price)}
                          </td>

                          <td>
                            <button
                              type="button"
                              onclick="addToCart('${item.id}')">

                              Add
                            </button>
                          </td>
                        </tr>
                      `)
                      .join("")}
                  </tbody>
                </table>
              </div>
            </details>
          `)
          .join("")}
      </div>
    `)
    .join("");
}

function findProduct(id) {
  return products
    .flatMap(category => category.groups)
    .flatMap(group => group.items)
    .find(item => item.id === id);
}

function addToCart(id) {
  const product = findProduct(id);

  if (!product) {
    return;
  }

  const existing = cart.find(item => item.id === id);

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
  const item = cart.find(line => line.id === id);

  if (item) {
    item.count += 1;
    refreshCart();
  }
}

function decreaseQuantity(id) {
  const item = cart.find(line => line.id === id);

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
  cart = cart.filter(item => item.id !== id);
  refreshCart();
}

function packageCount() {
  return cart.reduce(
    (sum, item) => sum + item.count,
    0
  );
}

function cookieCount() {
  return cart.reduce(
    (sum, item) => sum + item.qty * item.count,
    0
  );
}

function cookieSubtotal() {
  return cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
}

function deliveryFee() {
  const fulfillment = document.querySelector(
    'input[name="fulfillment"]:checked'
  ).value;

  if (fulfillment !== "delivery") {
    return 0;
  }

  const district = $("district").value;

  if (district === "1" || district === "2") {
    return 7.5;
  }

  if (district === "3") {
    return 15;
  }

  return 0;
}

function total() {
  return cookieSubtotal() + deliveryFee();
}

function dateIsValid() {
  const value = $("orderDate").value;

  if (!value) {
    return false;
  }

  return value >= $("orderDate").min;
}

function renderCart() {
  if (!cart.length) {
    $("cart").innerHTML = `
      <p class="muted">
        Your order is empty.
      </p>
    `;

    return;
  }

  $("cart").innerHTML = cart
    .map(item => `
      <div class="order-line">
        <div>
          <b>
            ${escapeHtml(item.name)}
          </b>

          <small>
            Package: ${escapeHtml(item.size)} × ${item.count}
          </small>

          <small>
            ${item.qty * item.count} cookies
          </small>

          <div class="quantity-controls">
            <button
              type="button"
              aria-label="Decrease quantity"
              onclick="decreaseQuantity('${item.id}')">

              −
            </button>

            <span class="quantity-number">
              ${item.count}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              onclick="increaseQuantity('${item.id}')">

              +
            </button>
          </div>

          <button
            class="remove"
            type="button"
            onclick="removeFromCart('${item.id}')">

            Remove
          </button>
        </div>

        <strong>
          ${money(item.price * item.count)}
        </strong>
      </div>
    `)
    .join("");
}

function updateTotals() {
  $("pageOrderTotal").textContent = money(total());

  $("stickyItems").textContent =
    `${packageCount()} ${
      packageCount() === 1 ? "package" : "packages"
    }`;

  $("stickyTotal").textContent =
    `Total: ${money(total())}`;
}

function updateSummary() {
  $("submitOrder").disabled = !(
    cart.length &&
    dateIsValid() &&
    $("customerName").value.trim() &&
    $("phone").value.trim() &&
    $("acceptPolicy").checked
  );
}

function refreshCart() {
  renderCart();
  updateTotals();
  updateSummary();
}

function updateDateDisplay() {
  $("selectedDateWords").textContent =
    formatDateInWords($("orderDate").value);
}

function toggleFields() {
  const packaging = document.querySelector(
    'input[name="packaging"]:checked'
  ).value;

  const fulfillment = document.querySelector(
    'input[name="fulfillment"]:checked'
  ).value;

  const payment = getSelectedPaymentMethod();

  $("specialRequest")
    .classList
    .toggle("hidden", packaging !== "other");

  $("deliveryFields")
    .classList
    .toggle("hidden", fulfillment !== "delivery");

  $("bankFields")
    .classList
    .toggle("hidden", payment !== "bank");

  $("cashNotice")
    .classList
    .toggle("hidden", payment !== "cash");

  updatePaymentProofRequirement();
  updateTotals();
  updateSummary();
}

function buildConfirmationSummary() {
  const lines = cart
    .map(item => `
      <div class="confirmation-summary-line">
        <span>
          ${escapeHtml(item.name)}<br>

          <small>
            ${escapeHtml(item.size)} × ${item.count}
            (${item.qty * item.count} cookies)
          </small>
        </span>

        <strong>
          ${money(item.price * item.count)}
        </strong>
      </div>
    `)
    .join("");

  $("confirmationSummary").innerHTML = `
    <div class="confirmation-summary-line">
      <span>Payment reference</span>

      <strong>
        ${paymentReference}
      </strong>
    </div>

    ${lines}

    <div class="confirmation-summary-line">
      <span>Selected date</span>

      <strong>
        ${formatDateInWords($("orderDate").value)}
      </strong>
    </div>

    <div class="confirmation-summary-line">
      <strong>Total</strong>

      <strong>
        ${money(total())}
      </strong>
    </div>
  `;
}

function openConfirmationModal() {
  const form = $("orderForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!validatePaymentProof()) {
    return;
  }

  buildConfirmationSummary();

  $("confirmationModal")
    .classList
    .remove("hidden");

  $("confirmationBackdrop")
    .classList
    .remove("hidden");
}

function closeConfirmationModal() {
  $("confirmationModal")
    .classList
    .add("hidden");

  $("confirmationBackdrop")
    .classList
    .add("hidden");
}

function buildWhatsAppMessage() {
  if (!validatePaymentProof()) {
    return "";
  }

  const fulfillment = document.querySelector(
    'input[name="fulfillment"]:checked'
  ).value;

  const payment = getSelectedPaymentMethod();

  const lines = cart
    .map(item =>
      `${item.name} — ${item.size} × ${item.count} package(s), ` +
      `${item.qty * item.count} cookies: ` +
      `${money(item.price * item.count)}`
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

  const packaging = document.querySelector(
    'input[name="packaging"]:checked'
  ).value;

  return `Hello Taste of Joy! I would like to place an order.

PAYMENT REFERENCE
${paymentReference}

CUSTOMER
Name: ${$("customerName").value.trim()}
Phone: ${$("phone").value.trim()}
Email: ${
    $("email").value.trim() || "Not provided"
  }

ORDER
${lines}

PACKAGING
${
    packaging === "standard"
      ? "Standard packaging"
      : $("specialRequestText").value.trim() ||
        "Special request"
  }

TOTAL
${money(total())}

FULFILLMENT
${
    fulfillment === "pickup"
      ? "Pickup from Grote Berg, Kaya H11"
      : `Delivery district: ${$("district").value}
Address: ${$("address").value.trim()}
Instructions: ${
          $("instructions").value.trim() || "None"
        }`
  }

REQUESTED DATE
${formatDateInWords($("orderDate").value)}

DATE NOTE
${
    $("dateNote").value.trim() || "None"
  }

PAYMENT
${paymentDetails}

Thank you for your order!`;
}

function sendOrderToWhatsApp() {
  const form = $("orderForm");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!validatePaymentProof()) {
    return;
  }

  const message = buildWhatsAppMessage();

  if (!message) {
    return;
  }

  const url =
    `https://wa.me/${WHATSAPP_COUNTRY_NUMBER}?text=` +
    encodeURIComponent(message);

  window.open(url, "_blank");

  closeConfirmationModal();

  $("formMessage").textContent =
    "Your order is ready to send to WhatsApp.";

  $("formMessage").className = "notice";
}

document.addEventListener("DOMContentLoaded", () => {
  createOrderReference();

  const minimumDate = new Date(
    Date.now() + 4 * 86400000
  )
    .toISOString()
    .slice(0, 10);

  $("orderDate").min = minimumDate;

  $("orderDate").addEventListener("change", () => {
    updateDateDisplay();
    updateSummary();
  });

  $("acceptPolicy").addEventListener(
    "change",
    updateSummary
  );

  $("district").addEventListener(
    "change",
    updateTotals
  );

  $("proof").addEventListener("change", () => {
    $("proof").setCustomValidity("");
    $("formMessage").textContent = "";
    updateSummary();
  });

  document
    .querySelectorAll(
      "input[name='packaging'], " +
      "input[name='fulfillment'], " +
      "input[name='payment']"
    )
    .forEach(input => {
      input.addEventListener("change", toggleFields);
    });

  document
    .querySelectorAll(
      "input, textarea, select"
    )
    .forEach(element => {
      element.addEventListener("input", updateSummary);
      element.addEventListener("change", updateSummary);
    });

  $("submitOrder").addEventListener(
    "click",
    openConfirmationModal
  );

  $("stickyReview").addEventListener(
    "click",
    openConfirmationModal
  );

  $("confirmationClose").addEventListener(
    "click",
    closeConfirmationModal
  );

  $("confirmationBackdrop").addEventListener(
    "click",
    closeConfirmationModal
  );

  $("editOrder").addEventListener(
    "click",
    closeConfirmationModal
  );

  $("confirmOrder").addEventListener(
    "click",
    sendOrderToWhatsApp
  );

  renderMenu();
  refreshCart();
  updateDateDisplay();
  toggleFields();
});
            price: 21.25
          },
          {
            id: "med50",
            name: "Original cookies",
            size: "Medium — 3 inches",
            qty: 50,
            price: 42.50
          },
          {
            id: "med100",
            name: "Original cookies",
            size: "Medium — 3 inches",
            qty: 100,
            price: 85.00
          }
        ]
      },
      {
        title: "Large",
        subtitle: "4 inches",
        items: [
          {
            id: "large25",
            name: "Original cookies",
            size: "Large — 4 inches",
            qty: 25,
            price: 28.75
          },
          {
            id: "large50",
            name: "Original cookies",
            size: "Large — 4 inches",
            qty: 50,
            price: 57.50
          },
          {
            id: "large100",
            name: "Original cookies",
            size: "Large — 4 inches",
            qty: 100,
            price: 115.00
          }
        ]
      },
      {
        title: "X-large",
        subtitle: "5 inches",
        items: [
          {
            id: "xl25",
            name: "Original cookies",
            size: "X-large — 5 inches",
            qty: 25,
            price: 37.50
          },
          {
            id: "xl50",
            name: "Original cookies",
            size: "X-large — 5 inches",
            qty: 50,
            price: 75.00
          },
          {
            id: "xl100",
            name: "Original cookies",
            size: "X-large — 5 inches",
            qty: 100,
            price: 150.00
          }
        ]
      },
      {
        title: "2 X-large",
        subtitle: "6 inches",
        items: [
          {
            id: "xxl25",
            name: "Original cookies",
            size: "2 X-large — 6 inches",
            qty: 25,
            price: 56.25
          },
          {
            id: "xxl50",
            name: "Original cookies",
            size: "2 X-large — 6 inches",
            qty: 50,
            price: 112.50
          },
          {
            id: "xxl100",
            name: "Original cookies",
            size: "2 X-large — 6 inches",
            qty: 100,
            price: 225.00
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
            price: 32.50
          },
          {
            id: "letters100",
            name: "Numbers and letters",
            size: "Regular size",
            qty: 100,
            price: 65.00
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
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 25,
            price: 21.25
          },
          {
            id: "chip50",
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 50,
            price: 42.50
          },
          {
            id: "chip100",
            name: "Chocolate chip cookie",
            size: "Regular — 2 inches",
            qty: 100,
            price: 85.00
          }
        ]
      }
    ]
  }
];

const translations = {
  en: {
    madeToOrder: "Fresh cookies, made to order",
    orderCookies: "Order your cookies",
    menu: "Cookie menu",
    chooseSize: "Choose a cookie size to view the available options.",
    yourOrder: "Your order",
    emptyCart: "Your order is empty.",
    packaging: "Packaging & special requests",
    standardPackaging: "Standard packaging",
    otherRequest: "Other packaging or special request",
    reviewLater: "Price to be confirmed",
    specialPlaceholder: "Describe your packaging or special request",
    fulfillment: "Pickup or delivery",
    pickup: "Pickup",
    delivery: "Delivery",
    selectDistrict: "Select a district",
    district: "Delivery district",
    address: "Delivery address",
    instructions: "Delivery instructions",
    nextDate: "Next available pickup/delivery date",
    dateExplanation: "The first available date is at least 3 days from today.",
    chooseDate: "Choose date",
    selectedDate: "Selected date",
    dateNote: "Date note",
    dateNotePlaceholder: "Add a note about the requested date, if needed",
    noDate: "No date selected",
    customerInfo: "Customer information",
    name: "Name",
    phone: "Phone number",
    email: "Email — optional",
    saveProfile: "I agree that Taste of Joy may securely save my customer information and order history for future orders.",
    payment: "Payment",
    bankTransfer: "Bank transfer",
    cashDelivery: "Cash on delivery",
    exactCash: "Exact amount required — no change available",
    testBank: "Testing bank instructions",
    paymentReference: "Payment reference",
    referenceInstruction: "Use this reference when making your payment and include it with your payment proof.",
    uploadProof: "Upload payment proof",
    proofRequired: "Payment proof is required before sending the order to WhatsApp.",
    cashNotice: "Please have the exact amount ready. Taste of Joy does not carry change.",
    review: "Review and accept",
    acceptPolicy: "I understand the payment requirements and cancellation policy and wish to continue with the order.",
    sendOrder: "Review order before WhatsApp",
    thankYou: "Thank you for your order!",
    language: "Language",
    add: "Add",
    remove: "Remove",
    packages: "packages",
    package: "package",
    cookies: "cookies",
    total: "Total",
    cookieSubtotal: "Cookie subtotal",
    confirmTitle: "Confirm your order",
    confirmNote: "Please review your order before continuing to WhatsApp.",
    editOrder: "Go back and edit",
    confirmAndWhatsApp: "Confirm and continue to WhatsApp",
    orderConfirmed: "Your order is ready to send to WhatsApp."
  }
};

let cart = [];
let paymentReference = "";

const $ = id =>
  document.getElementById(id);

function tr(key) {
  return translations.en[key] || key;
}

function money(value) {
  return `XCG ${value.toFixed(2)}`;
}

function generatePaymentReference() {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const randomValues =
    new Uint32Array(6);

  if (
    window.crypto &&
    typeof window.crypto.getRandomValues ===
      "function"
  ) {
    window.crypto.getRandomValues(
      randomValues
    );
  } else {
    for (
      let index = 0;
      index < randomValues.length;
      index += 1
    ) {
      randomValues[index] =
        Math.floor(
          Math.random() *
          alphabet.length
        );
    }
  }

  let code = "";

  for (
    let index = 0;
    index < 6;
    index += 1
  ) {
    code +=
      alphabet[
        randomValues[index] %
          alphabet.length
      ];
  }

  return `TOJ-${code}`;
}

function createOrderReference() {
  paymentReference =
    generatePaymentReference();

  if ($("paymentReference")) {
    $("paymentReference").textContent =
      paymentReference;
  }
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
    getSelectedPaymentMethod() ===
    "bank"
  );
}

function hasPaymentProof() {
  return (
    $("proof") &&
    $("proof").files &&
    $("proof").files.length > 0
  );
}

function validatePaymentProof() {
  if (
    bankProofIsRequired() &&
    !hasPaymentProof()
  ) {
    $("proof").setCustomValidity(
      tr("proofRequired")
    );

    $("proof").reportValidity();

    $("formMessage").textContent =
      tr("proofRequired");

    $("formMessage").className =
      "notice error";

    return false;
  }

  $("proof").setCustomValidity("");

  return true;
}

function updatePaymentProofRequirement() {
  const required =
    bankProofIsRequired();

  $("proof").required =
    required;

  $("proofRequirementMessage")
    .classList
    .toggle(
      "hidden",
      !required
    );

  if (!required) {
    $("proof").setCustomValidity("");
  }

  updateSummary();
}

function ordinal(day) {
  const remainder100 = day % 100;

  if (
    remainder100 >= 11 &&
    remainder100 <= 13
  ) {
    return `${day}th`;
  }

  if (day % 10 === 1) {
    return `${day}st`;
  }

  if (day % 10 === 2) {
    return `${day}nd`;
  }

  if (day % 10 === 3) {
    return `${day}rd`;
  }

  return `${day}th`;
}

function formatDateInWords(value) {
  if (!value) {
    return tr("noDate");
  }

  const date =
    new Date(`${value}T00:00:00`);

  const weekday =
    date.toLocaleDateString(
      "en-US",
      {
        weekday: "long"
      }
    );

  const month =
    date.toLocaleDateString(
      "en-US",
      {
        month: "long"
      }
    );

  return `${weekday}, ${month} ${ordinal(
    date.getDate()
  )}`;
}

function renderMenu() {
  $("menu").innerHTML =
    products
      .map(category => `
        <div class="menu-category">
          <h3 class="category-title">
            ${category.category}
          </h3>

          ${category.groups
            .map(group => `
              <details class="cookie-group">
                <summary>
                  ${group.title}

                  <small>
                    ${group.subtitle}
                  </small>
                </summary>

                <div class="cookie-table-wrap">
                  <table class="cookie-table">
                    <caption>
                      ${category.category} —
                      ${group.title}
                    </caption>

                    <thead>
                      <tr>
                        <th>
                          Cookie
                        </th>

                        <th>
                          Size
                        </th>

                        <th>
                          Quantity
                        </th>

                        <th>
                          Price
                        </th>

                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      ${group.items
                        .map(item => `
                          <tr>
                            <td>
                              ${item.name}
                            </td>

                            <td>
                              ${item.size}
                            </td>

                            <td>
                              ${item.qty}
                            </td>

                            <td>
                              ${money(item.price)}
                            </td>

                            <td>
                              <button
                                type="button"
                                onclick="addToCart('${item.id}')">
                                ${tr("add")}
                              </button>
                            </td>
                          </tr>
                        `)
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </details>
            `)
            .join("")}
        </div>
      `)
      .join("");
}

function findProduct(id) {
  return products
    .flatMap(category => category.groups)
    .flatMap(group => group.items)
    .find(item => item.id === id);
}

function addToCart(id) {
  const product =
    findProduct(id);

  if (!product) {
    return;
  }

  const existing =
    cart.find(item => item.id === id);

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
    cart.find(line => line.id === id);

  if (item) {
    item.count += 1;
    refreshCart();
  }
}

function decreaseQuantity(id) {
  const item =
    cart.find(line => line.id === id);

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
    cart.filter(item => item.id !== id);

  refreshCart();
}

function packageCount() {
  return cart.reduce(
    (sum, item) => sum + item.count,
    0
  );
}

function cookieCount() {
  return cart.reduce(
    (sum, item) =>
      sum + item.qty * item.count,
    0
  );
}

function cookieSubtotal() {
  return cart.reduce(
    (sum, item) =>
      sum + item.price * item.count,
    0
  );
}

function deliveryFee() {
  const fulfillment =
    document.querySelector(
      'input[name="fulfillment"]:checked'
    ).value;

  if (fulfillment !== "delivery") {
    return 0;
  }

  const district =
    $("district").value;

  if (
    district === "1" ||
    district === "2"
  ) {
    return 7.50;
  }

  if (district === "3") {
    return 15.00;
  }

  return 0;
}

function total() {
  return (
    cookieSubtotal() +
    deliveryFee()
  );
}

function dateIsValid() {
  const value =
    $("orderDate").value;

  if (!value) {
    return false;
  }

  return value >= $("orderDate").min;
}

function renderCart() {
  if (!cart.length) {
    $("cart").innerHTML = `
      <p class="muted">
        ${tr("emptyCart")}
      </p>
    `;

    return;
  }

  $("cart").innerHTML =
    cart
      .map(item => `
        <div class="order-line">
          <div>
            <b>
              ${item.name}
            </b>

            <small>
              Package: ${item.size} × ${item.count}
            </small>

            <small>
              ${item.qty * item.count}
              ${tr("cookies")}
            </small>

            <div class="quantity-controls">
              <button
                type="button"
                onclick="decreaseQuantity('${item.id}')">
                −
              </button>

              <span class="quantity-number">
                ${item.count}
              </span>

              <button
                type="button"
                onclick="increaseQuantity('${item.id}')">
                +
              </button>
            </div>

            <button
              class="remove"
              type="button"
              onclick="removeFromCart('${item.id}')">
              ${tr("remove")}
            </button>
          </div>

          <strong>
            ${money(
              item.price * item.count
            )}
          </strong>
        </div>
      `)
      .join("");
}

function updateTotals() {
  $("pageOrderTotal").textContent =
    money(total());

  $("stickyItems").textContent =
    `${packageCount()} ${
      packageCount() === 1
        ? tr("package")
        : tr("packages")
    }`;

  $("stickyTotal").textContent =
    `${tr("total")}: ${money(total())}`;
}

function updateSummary() {
  $("finalSummary").innerHTML = `
    <div class="summary-row">
      <span>
        ${tr("paymentReference")}
      </span>

      <b>
        ${paymentReference}
      </b>
    </div>

    <div class="summary-row">
      <span>
        ${tr("cookieSubtotal")}
      </span>

      <b>
        ${money(cookieSubtotal())}
      </b>
    </div>

    <div class="summary-row">
      <span>
        ${tr("delivery")}
      </span>

      <b>
        ${money(deliveryFee())}
      </b>
    </div>

    <div class="summary-row">
      <strong>
        ${tr("total")}
      </strong>

      <strong>
        ${money(total())}
      </strong>
    </div>
  `;

  $("submitOrder").disabled =
    !(
      cart.length &&
      dateIsValid() &&
      $("acceptPolicy").checked
    );
}

function refreshCart() {
  renderCart();
  updateTotals();
  updateSummary();
}

function updateDateDisplay() {
  $("selectedDateWords")
    .textContent =
    formatDateInWords(
      $("orderDate").value
    );
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

  $("specialRequest")
    .classList
    .toggle(
      "hidden",
      packaging !== "other"
    );

  $("deliveryFields")
    .classList
    .toggle(
      "hidden",
      fulfillment !== "delivery"
    );

  $("bankFields")
    .classList
    .toggle(
      "hidden",
      payment !== "bank"
    );

  $("cashNotice")
    .classList
    .toggle(
      "hidden",
      payment !== "cash"
    );

  updatePaymentProofRequirement();
  updateSummary();
}

function buildConfirmationSummary() {
  const lines =
    cart
      .map(item => `
        <div class="confirmation-summary-line">
          <span>
            ${item.name}<br>

            <small>
              ${item.size} × ${item.count}
              (${item.qty * item.count}
              ${tr("cookies")})
            </small>
          </span>

          <strong>
            ${money(
              item.price * item.count
            )}
          </strong>
        </div>
      `)
      .join("");

  $("confirmationSummary").innerHTML = `
    <div class="confirmation-summary-line">
      <span>
        ${tr("paymentReference")}
      </span>

      <strong>
        ${paymentReference}
      </strong>
    </div>

    ${lines}

    <div class="confirmation-summary-line">
      <span>
        ${tr("selectedDate")}
      </span>

      <strong>
        ${formatDateInWords(
          $("orderDate").value
        )}
      </strong>
    </div>

    <div class="confirmation-summary-line">
      <strong>
        ${tr("total")}
      </strong>

      <strong>
        ${money(total())}
      </strong>
    </div>
  `;
}

function openConfirmationModal() {
  if (!validatePaymentProof()) {
    return;
  }

  buildConfirmationSummary();

  $("confirmationModal")
    .classList
    .remove("hidden");

  $("confirmationBackdrop")
    .classList
    .remove("hidden");
}

function closeConfirmationModal() {
  $("confirmationModal")
    .classList
    .add("hidden");

  $("confirmationBackdrop")
    .classList
    .add("hidden");
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

  const lines =
    cart
      .map(item => {
        return `${item.name} — ${item.size} × ${item.count} package(s), ${item.qty * item.count} cookies: ${money(
          item.price * item.count
        )}`;
      })
      .join("\n");

  const paymentDetails =
    payment === "bank"
      ? `Bank transfer
Bank: MCB
Account: ${TEST_ACCOUNT}
Payment reference: ${paymentReference}
Payment proof: ${
          $("proof").files.length
            ? "Uploaded"
            : "Not uploaded"
        }`
      : `Cash on delivery
Payment reference: ${paymentReference}
Amount due: ${money(total())}`;

  return `Hello Taste of Joy! I would like to place an order.

PAYMENT REFERENCE
${paymentReference}

CUSTOMER
Name: ${$("customerName").value.trim()}
Phone: ${$("phone").value.trim()}
Email: ${
    $("email").value.trim() ||
    "Not provided"
  }

ORDER
${lines}

TOTAL
${money(total())}

FULFILLMENT
${
    fulfillment === "pickup"
      ? "Pickup: Grote Berg, Kaya H11"
      : `Delivery district: ${$("district").value}
Address: ${$("address").value.trim()}
Instructions: ${
          $("instructions").value.trim() ||
          "None"
        }`
  }

REQUESTED DATE
${formatDateInWords(
    $("orderDate").value
  )}

DATE NOTE
${
    $("dateNote").value.trim() ||
    "None"
  }

PAYMENT
${paymentDetails}

Thank you for your order!`;
}

function sendOrderToWhatsApp() {
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

  window.open(url, "_blank");

  closeConfirmationModal();

  $("formMessage").textContent =
    tr("orderConfirmed");

  $("formMessage").className =
    "notice";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    createOrderReference();

    const minimumDate =
      new Date(
        Date.now() +
        4 * 86400000
      )
        .toISOString()
        .slice(0, 10);

    $("orderDate").min =
      minimumDate;

    $("orderDate").addEventListener(
      "change",
      () => {
        updateDateDisplay();
        updateSummary();
      }
    );

    $("acceptPolicy").addEventListener(
      "change",
      updateSummary
    );

    $("district").addEventListener(
      "change",
      updateSummary
    );

    $("proof").addEventListener(
      "change",
      () => {
        $("proof").setCustomValidity("");
        $("formMessage").textContent = "";
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
      });

    $("submitOrder").addEventListener(
      "click",
      openConfirmationModal
    );

    $("confirmationClose").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("confirmationBackdrop").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("editOrder").addEventListener(
      "click",
      closeConfirmationModal
    );

    $("confirmOrder").addEventListener(
      "click",
      sendOrderToWhatsApp
    );

    renderMenu();
    refreshCart();
    updateDateDisplay();
    toggleFields();
  }
);
