import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props)        
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product)
  }

  render() {
    const { title, price, image } = this.props.product
    const item = document.createElement('div')
    item.className = 'product-item'

    item.innerHTML = `
      <div class="image-container">
        <img class="product-img" src="${image}" alt="${title}" />
      </div>
      <h3 class="product-title">${title}</h3>
      <p>Price: $${price}</p>
      <button class="add-cart-btn">Add to Cart</button>
    `
    item.querySelector('.add-cart-btn').addEventListener('click', this.handleAddToCart)

    return item
  }
}