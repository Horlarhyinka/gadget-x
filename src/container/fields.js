const Fields = (obj,funcs) => {

const fields = Object.entries(obj).map(i =>{
return <div className="fieldcompwrapper">
        <label>i[0]</label>
        <input type={"text"} defaultValue={i[1]} />
        </div>
    })

    return ( <div>

    </div> );
}
 
export default Fields;