import { Component } from "../common/Component.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";

const cartContext = {
  cart: [],
  subscribers: [],
  subscribe(callback) {
    this.subscribers.push(callback)
  },
  notify(cart) {
    this.cart = cart
    this.subscribers.forEach(callback => callback(cart))
  }
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.footer = new Footer()
    this.cartlist = new CartList({ cartContext: this.props.cartContext })
    this.productList = new ProductList({ cartContext: this.props.cartContext })
    this.products = [] // 初始化產品資料
    this.showCart = false  // 初始狀態：不顯示購物車
    this.toggleCart = this.toggleCart.bind(this);
    this.header = new Header({ onCartToggle: this.toggleCart })  // 把 toggleCart 傳給 Header
  }

  async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      this.products = await response.json()
      const productContainer = document.querySelector('.product-list-container')
      if (productContainer) {
        productContainer.innerHTML = ''  // 清空舊內容
        productContainer.appendChild(this.productList.render(this.products)) // 加入新內容
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  toggleCart() {
    this.showCart = !this.showCart;
    const cartContainer = document.querySelector('.cart-container')
  
    if (cartContainer) {
      // 如果購物車已經存在，只切換 class，不重新渲染
      cartContainer.classList.toggle('open', this.showCart)
    } else if (this.showCart) {
      // 如果購物車不存在，新增它
      const appContainer = document.querySelector('.container')
      if (appContainer) {
        const cartList = this.renderCart()
        appContainer.appendChild(cartList)
      }
    }
  }

  renderCart() {
    const cartList = document.createElement('aside')
    cartList.className = `cart-container ${this.showCart ? "open" : ""}`
    cartList.appendChild(this.cartlist.render())
    return cartList
  }  

  render() {
    const container = document.createElement('div')
    container.className = 'container'

    // Header
    const headerElement = this.header.render()
    container.appendChild(headerElement)
    
    // Main
    const mainContent = document.createElement('main')
    const h1Tag = document.createElement('h1')
    h1Tag.innerText = "Welcome to Julia's Clothes Shop"

    const productContainer = document.createElement('div')
    productContainer.className = 'product-list-container' // 用於稍後動態更新產品列表
    productContainer.innerHTML = '<p>Loading products...</p>' // 顯示初始狀態

    mainContent.appendChild(h1Tag)
    mainContent.appendChild(productContainer)
    container.appendChild(mainContent)

    // Cart
    if (this.showCart) {
      const cartList = this.renderCart();
      container.appendChild(cartList);
    }

    // Footer
    const footerElement = this.footer.render()
    container.appendChild(footerElement)

    return container
  }
}