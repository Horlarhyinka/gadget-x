import axios from "axios"
import {Component} from "react"
import SearchSection from "../components/search"
import Products from "../components/products"

const productsUrl = "http://localhost:2003/api/v1/products"

class Shop extends Component {
    allProducts 
    state = { 
        products:[],
     } 
     componentDidMount = async() =>{
        let allProducts = await axios(productsUrl)
        this.allProducts = allProducts.data
        this.setState({products:[...allProducts.data]})
     }
     handleSearchChange = (e) =>{
        let searchField = e.target.value.trim()
        if(!this.allProducts){
            axios.get(productsUrl).then(res=>{
            return this.setState({products:res.data.filter(prod=>prod.category.includes(searchField))})
            })
            return
        }
        let newProducts = this.allProducts && this.allProducts.filter((product)=>{
            return product.category.toLowerCase().includes(searchField.toLowerCase()) || product.name.toLowerCase().includes(searchField.toLowerCase()) || Math.abs(product.price - parseInt(searchField)) <= 10
        })
        
        this.setState({products:[...newProducts]})
     }
    
    render() { 
        return (<div className="shop" >
            <SearchSection handleSearchChange={this.handleSearchChange} />
            <Products products={this.state.products} />
        </div>);
    }
}
 
export default Shop;