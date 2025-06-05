import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  render(products) {
    const list = document.createElement('div')
    list.className = 'product-list'    

     // 檢查是否有產品資料
     if (!products || products.length === 0) {
      list.innerHTML = '<p>No products available.</p>'
      return list
    }

    // 渲染每個產品
    products.forEach(product => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext
      })
      list.appendChild(productItem.render())
    })

    return list
  }
}