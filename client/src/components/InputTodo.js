import React,{Fragment} from "react";

export default function InputTodo(){

    const[description,setDescription] = React.useState("");

    function handleChange(event){
        setDescription(event.target.value);
    }


    async function handleSubmit(e){
        e.preventDefault();
        try {
            const body = {description};
            console.log(body);
            const response=await fetch("http://localhost:5000/todos",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            window.location("/");
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo</h1>
            <form className="d-flex mt-5" onSubmit={handleSubmit}>
                <input type="text" className="form-control"placeholder="Description" value={description} onChange={handleChange}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}