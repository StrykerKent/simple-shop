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
