import axios from "axios";

const remove = async (id,setter) => {
    const update = await axios.delete(`http://localhost:2003/api/v1/products/${id}`);
    return setter(update.data)
}
export default remove;