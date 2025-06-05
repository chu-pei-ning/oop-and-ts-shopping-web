import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleUpdate(id) {
    this.props.cartContext.updateQuantity(id)
  }

  handleRemove(id) {
    this.props.cartContext.removeProduct(id)
  }

  handleAdd(id, amount) {
    this.props.cartContext.updateQuantity(id, amount)
  }
  
  handleDecrease(id) {
    this.handleAdd(id, -1)
  }
  
  
  render() {
    const productElement = document.createElement('li')
    productElement.className = "product-item-li"
    const item = this.props.item;
    productElement.innerHTML = `
      <div>
        <div class="cart-item-img">
          <img class="product-img" src="${item.image}" alt="${item.title}" width="60px" />
          <p>${item.title}: <strong>$${item.price}</strong></p>
        </div>
        <div class="cart-item-btn">
          <button id='btn-add'>+</button>
          <strong>${item.quantity}</strong>
          <button id='btn-minus'>-</button>
          <button id='btn-remove'>Remove</button>
        </div>
      </div>
    `

    productElement.querySelector('#btn-add').addEventListener('click', () => this.handleAdd(this.props.item.id, 1))
    productElement.querySelector('#btn-minus').addEventListener('click', () => this.handleDecrease(this.props.item.id))
    productElement.querySelector('#btn-remove').addEventListener('click', () => this.handleRemove(this.props.item.id))

    return productElement;
  }
}