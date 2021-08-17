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

// let count = 0;
// let price = 0;
let count = 2;
let price = 226;

// add to cart button event. add event to all add to cart buttons
let allbtn_shop = document.querySelectorAll('[id^=add_to_cart_]');

for (let i = 0; i < allbtn_shop.length; i++) {
  allbtn_shop[i].addEventListener('click', (e) => {
    console.log(e);
    console.log(e.target.attributes[2].value);

    const item_id = parseInt(e.target.attributes[2].value);

    //match item
    const item = items.filter((x) => x.id === item_id);

    console.log(item);
    count += parseInt(item[0].quantity);
    price += parseInt(item[0].price);
    document.querySelector('#shop_badge').innerHTML = count;

    //add item to cart
    let div = document.createElement('div');
    div.className = 'row cart_row item_text mt-3';
    div.setAttribute('data-line_number', count);
    div.innerHTML = `
      <div>${item[0].name}</div>
      <div>$${item[0].price}</div>
      <div class="cart_quantity">
        <input name="quantity${count}" type="number" value="1" class="quantity_width">
        <button id="remove${count}" class="btn btn_shop">REMOVE</button>
      </div>
    `;

    document.querySelector('#cart_main').appendChild(div);

    //add item to items_in_cart
    items_in_cart.push({
      line_number: count,
      item_id: item[0].id,
      name: `${item[0].name}`,
      price: item[0].price,
      quantity: 1,
    });
    //update total
    document.querySelector('#total').innerHTML = `$${price}`;
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

//close cart
document.getElementById('close_cart').addEventListener('click', () => {
  //add class hide
  document.getElementById('cart').classList.add('hide');
});

//purchase click
document.getElementById('checkout').addEventListener('click', () => {
  alert(`Fake purchase for $${price} made. Thank you.`);
  location.reload();
});

//remove button logic
document.addEventListener('click', (e) => {
  if (e.target && e.target.id.includes('remove')) {
    //remove item from array
    // get line number
    let line_number = e.target
      .closest('.cart_row')
      .getAttribute('data-line_number');
    // find index of line number
    let index = items_in_cart.findIndex(
      (items_in_cart) => items_in_cart.line_number == line_number
    );
    items_in_cart.splice(index, 1);
    // console.log(items_in_cart);

    // remove item from cart visually
    e.target.closest('.cart_row').remove();

    // recalculate total
    let total = 0;
    if (items_in_cart.length > 0) {
      total = items_in_cart
        .map((x) => x.price)
        .reduce((accumulator, currentTotal) => accumulator + currentTotal);
    }
    console.log(total);
    price = total;
    document.querySelector('#total').innerHTML = `$${total}`;
  }
});

//todo: quantity change click
//todo: update cart count in header
