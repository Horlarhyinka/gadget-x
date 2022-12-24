import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/jumia.css";
import Card from "./jumia_card";
import { jumia_data } from "../assets/dummy";


const JumiaProducts = ({keyword}) => {
    const [data, setData] = useState([])
    
    const jumia_image_url = "data:image/png;base64,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"
 
    useEffect(()=>{
            axios.get("http://localhost:2003/api/v1/products/jumia?key="+keyword)
            .then(res=>{
                return setData(res.data)
                })
            .catch((err)=>{
                console.log(err)
                throw Error(err)
            })

    },[])

    const list = data.map((prod)=>{
                    return <Card key={prod.i} prop={prod} />
                })
    return (<div className="jumia-wrapper">
            <label className="jumia-head-label">from jumia 
            </label>
             <img className="jumia-head-logo" src={jumia_image_url} alt="jumia-logo" />
            <img className="jumia-head-logo" src={jumia_image_url} alt="jumia-logo" />
            <img className="jumia-head-logo" src={jumia_image_url} alt="jumia-logo" />
                <p className="jumia-result">{data.length} result{`${data.length>0?"s":""}`}</p>
                <div className="card-list">
                {
                    list
                }  
                </div>
            
            </div>)

}
 
export default JumiaProducts;