export class CartContext {
  constructor() {
    this.cart = []
    this.listeners = []
  }

  getCart() {
    return this.cart
  }


  addProduct(item) {    
    const found = this.cart.find(product => product.id === item.id)
    if (found) {
      this.cart = this.cart.map(product => {
        if (product.id === item.id) {
          return {
            ...product,
            quantity: product.quantity + 1
          }
        } else {
          return product
        }
      })
    } else {
      this.cart.push({
        ...item,
        quantity: 1
      }) // add product to cart array
    }
    
    this.notifyListeners()
  }
  
  updateQuantity(id, amount) {
    this.cart = this.cart.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: Math.max(1, product.quantity + amount) // make sure it won't under 1
        }
      } else {
        this.cart.push({
          ...product,
          quantity: 1
        }) // add product to cart array
      }
      return product
    })
    this.notifyListeners()
  }

  removeProduct(id) {
    this.cart = this.cart.filter(product => product.id !== id)
    this.notifyListeners()
  }

  subscribe(listener) {
    this.listeners.push(listener)
    console.log(this.listeners)
  }

  notifyListeners() {    
    this.listeners.forEach(listener => listener(this.cart))
  }
}