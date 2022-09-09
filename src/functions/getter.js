import axios from "axios";

const getResource = async(endpoint) => {
   return await axios.get(endpoint)
}

export  default getResource;