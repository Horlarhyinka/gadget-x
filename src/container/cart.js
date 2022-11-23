import {authHOC} from "./HOC/auth-hoc";
const Cart = () => {
return ( <div>
            Cart here
        </div> );
}
 
export default authHOC(Cart);