import React, { Fragment } from "react";
export default function EditTodo(props){
const[description , setNewTodo] = React.useState(props.desc);

    function handleChange(event){
        setNewTodo(event.target.value);
    }

    async function handleClick(e){
        e.preventDefault();
        try {
            const body={description};
            console.log(body);
            const response = await fetch(`http://localhost:5000/todos/${props.id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        console.log(response);
        } catch (error) {
            console.error(error.message);
        }
        
    }

    return(
        <Fragment>
            <button className="btn btn-warning" data-toggle="modal" data-target={`#id${props.id}`}>Edit</button>
            <div class="modal" id={`id${props.id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Todo</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="New Todo" onChange={handleChange} value={description}/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={(e) => handleClick(e)}>Edit</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

// <button className="btn btn-success" data-toggle="modal" data-target="#myModal" onClick={ () =>(HandleEdit(props.id))}>Edit</button>