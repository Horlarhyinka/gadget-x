import { useState } from "react"
import Card from "../components/admin_product_component";

const Productslist = ({products,category,search}) => {

    let [all,setAll] = useState()    
    const setter = (update)=>{
        if(!all.length) return;
        for(let i = 0;i < all.length; i++){
            if(all[i]._id === update._id){
                const updated = all.splice(i,1)
                return setAll(updated)
            }
}
    }
    if(!category || !search || category === "all"){
        all = products
    }
    if(category && category !== "all"){
        all = products.filter((prod) =>{
            return prod.category.toLowerCase() === category.toLowerCase()
        })
    }
    if(search){
        all = all.filter(({category,price,name})=>{
                return name.toLowerCase().includes(search.toLowerCase()) || category.toLowerCase().includes(search.toLowerCase()) || price <= parseInt(search) || price - parseInt(search) <= 10
            })
    }
    const list = all.map(item =>{
        return <Card key={item._id} setter={setter} props={item} />
    })
    return !all.length?
    <h1 className="notfound">no match found</h1>:
     <div style={{width:"100%"}}><p>results({all.length})</p>{list}</div>
}
 
export default Productslist;