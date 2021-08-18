const items = [
  {
    id: 1,
    name: 'Shirt',
    price: 26,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Hat',
    price: 20,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Pants',
    price: 100,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Skateboard',
    price: 200,
    quantity: 1,
  },
  {
    id: 5,
    name: 'Surfboard',
    price: 500,
    quantity: 1,
  },
  {
    id: 6,
    name: 'Hoverboard',
    price: 100000,
    quantity: 1,
  },
];

// const items_in_cart = [];
const items_in_cart = [
  {
    line_number: 1,
    item_id: 4,
    name: 'Skateboard',
    price: 200,
    quantity: 1,
  },
  {
    line_number: 2,
    item_id: 1,
    name: 'Shirt',
    price: 26,
    quantity: 1,
  },
];

// let lineCount = 0;
// let quantityTotal = 0;
// let cartTotal = 0;
let lineCount = 2;
let quantityTotal = 2;
let cartTotal = 226;

// add to cart button event. add event to all add to cart buttons
let allbtn_shop = document.querySelectorAll('[id^=add_to_cart_]');

for (let i = 0; i < allbtn_shop.length; i++) {
  allbtn_shop[i].addEventListener('click', (e) => {
    const item_id = parseInt(e.target.attributes[2].value);

    // match item
    const item = items.filter((x) => x.id === item_id);

    lineCount++;
    quantityTotal += parseInt(item[0].quantity);
    cartTotal += parseInt(item[0].price);
    document.querySelector('#shop_badge').innerHTML = quantityTotal;

    // add item to cart
    let div = document.createElement('div');
    div.className = 'row cart_row item_text mt-3';
    div.setAttribute('data-line_number', lineCount);
    div.innerHTML = `
      <div>${item[0].name}</div>
      <div>$${item[0].price}</div>
      <div class="cart_quantity">
        <input name="quantity${lineCount}" type="number" value="1" class="quantity_width" id="quantityLine${lineCount}">
        <button id="remove${lineCount}" class="btn btn_shop">REMOVE</button>
      </div>
    `;

    document.querySelector('#cart_main').appendChild(div);

    // add item to items_in_cart
    items_in_cart.push({
      line_number: lineCount,
      item_id: item[0].id,
      name: `${item[0].name}`,
      price: item[0].price,
      quantity: 1,
    });

    //update total
    document.querySelector('#total').innerHTML = `$${cartTotal}`;
  });
}

// on click cart on header (show cart)
document.querySelector('#cart_btn').addEventListener('click', () => {
  let cart = document.querySelector('#cart');
  // toggle showing and hiding cart
  if (cart.className.includes('hide')) {
    cart.classList.remove('hide');
  } else {
    cart.classList.add('hide');
  }
});

// close cart
document.getElementById('close_cart').addEventListener('click', () => {
  // add class hide
  document.getElementById('cart').classList.add('hide');
});

// purchase click
document.getElementById('checkout').addEventListener('click', () => {
  // recalculate total
  let cartTotal = 0;
  if (items_in_cart.length > 0) {
    cartTotal = items_in_cart
      .map((x) => x.price * x.quantity)
      .reduce((accumulator, currentTotal) => accumulator + currentTotal);
  }

  alert(`Fake purchase for $${cartTotal} made. Thank you.`);
  location.reload();
});

// remove button logic
document.addEventListener('click', (e) => {
  // remove button click
  if (e.target && e.target.id.includes('remove')) {
    // get line number
    let line_number = e.target
      .closest('.cart_row')
      .getAttribute('data-line_number');

    // find index of line number in cart array
    let index = items_in_cart.findIndex(
      (items_in_cart) => items_in_cart.line_number == line_number
    );

    //remove item from cart array
    items_in_cart.splice(index, 1);

    // remove item from cart visually
    e.target.closest('.cart_row').remove();

    // update quantity total
    quantityTotal = items_in_cart
      .map((x) => parseInt(x.quantity))
      .reduce((accumulator, currentTotal) => accumulator + currentTotal);

    // change quantity total in nav
    document.querySelector('#shop_badge').innerHTML = quantityTotal;

    // recalculate total
    let cartTotal = 0;
    if (items_in_cart.length > 0) {
      cartTotal = items_in_cart
        .map((x) => x.price * x.quantity)
        .reduce((accumulator, currentTotal) => accumulator + currentTotal);
    }

    // update total
    document.querySelector('#total').innerHTML = `$${cartTotal}`;
  }
});

// quantity change click
document.addEventListener('change', (e) => {
  if (e.target && e.target.id.includes('quantityLine')) {
    // get line number
    let line_number = e.target
      .closest('.cart_row')
      .getAttribute('data-line_number');
    // let line_number = getLineNumber(e.target.closest('.cart_row'));

    // change quantity for item in items_in_cart
    // find index of line number in cart array
    let index = items_in_cart.findIndex(
      (items_in_cart) => items_in_cart.line_number == line_number
    );

    // update quantity in cart array
    items_in_cart[index].quantity = parseInt(e.target.value);
    console.log(items_in_cart);

    // update quantity total
    quantityTotal = items_in_cart
      .map((x) => parseInt(x.quantity))
      .reduce((accumulator, currentTotal) => accumulator + currentTotal);

    // change quantity total in nav
    document.querySelector('#shop_badge').innerHTML = quantityTotal;

    // recalculate total
    let cartTotal = 0;
    if (items_in_cart.length > 0) {
      cartTotal = items_in_cart
        .map((x) => x.price * x.quantity)
        .reduce((accumulator, currentTotal) => accumulator + currentTotal);
    }
    // cartTotal = updateTotal();

    // update total
    document.querySelector('#total').innerHTML = `$${cartTotal}`;
  }
});

// const updateTotal = () => {
//   let cartTotal = 0;
//   if (items_in_cart.length > 0) {
//     cartTotal = items_in_cart
//       .map((x) => x.price * x.quantity)
//       .reduce((accumulator, currentTotal) => accumulator + currentTotal);
//   }
//   return cartTotal;
// };

// const getLineNumber = (target) => {
//   return target.getAttribute('data-line_number');
// };
