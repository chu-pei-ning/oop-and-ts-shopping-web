import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props)
    this.handleCartToggle = this.handleCartToggle.bind(this)
  }

  handleCartToggle() {    
    if (this.props.onCartToggle) {
      this.props.onCartToggle()  // 通知 App 切換購物車顯示狀態
    }
  }

  render() {
    const header = document.createElement('header')
    header.innerHTML = `
      <h2>Julia's Clothes Shop</h2>
      <button class='cart-button'>
        <img src="./img/shopping-cart.png" alt="shopping cart" width="60px">           
      </button>
    `

    header.querySelector('.cart-button').addEventListener('click', this.handleCartToggle)

    return header
  }
}