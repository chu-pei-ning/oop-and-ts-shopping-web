import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = { cart: [] }
    this.updateCart = this.updateCart.bind(this)  

    if (this.props.cartContext) {  // 避免 undefined 錯誤
      this.props.cartContext.subscribe(this.updateCart)
    } else {
      console.error("CartContext is undefined in CartList")
    }
    this.cartElement = null;
    this.productListElement = null
    this.totalPrice = 0
    this.totalItems = 0
  }

  updateCart(cart) { 
    this.state.cart = cart

    if (!this.productListElement) return  // 避免 `null` 錯誤
    this.productListElement.innerHTML = ``

    this.totalPrice = 0
    this.totalItems = 0

    this.state.cart.forEach(item => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext
      }).render()

      this.productListElement.appendChild(cartItem)
      this.totalPrice += item.price * item.quantity
      this.totalItems += item.quantity
    })

    const totalPriceElement = this.cartElement.querySelector(".total-price");
    
    if (totalPriceElement) {
      totalPriceElement.innerText = `Total Price: $${this.totalPrice.toFixed(2)}`;
    }

    const totalItemsElement = this.cartElement.querySelector(".total-items");
    if (totalItemsElement) {
      totalItemsElement.innerText = `Total Items: ${this.totalItems}`;
    }

  }

  render() {
    const cartElement = document.createElement('div')
    cartElement.innerHTML = `
      <h3>Cart</h3>
      <ul class="cart-list"></ul>
      <hr>
      <h3 class="total-items">Total Items: ${this.totalItems}</h3>
      <h3 class="total-price">Total Price: $${this.totalPrice.toFixed(2)}</h3>
      <button class="checkout-btn">Checkout</button>
    `

    this.productListElement = cartElement.querySelector('.cart-list') //要加這條不然會空 //綁定 productListElement
    this.cartElement = cartElement;
    this.updateCart(this.props.cartContext.cart)

    return cartElement
  }
}
