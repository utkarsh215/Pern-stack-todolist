import React,{Fragment} from "react";
import EditTodo from "./EditTodo"
export default function ListTodo(){
    const [description , setDescription]=React.useState([]);

    React.useEffect( ()=>{
        fetch("http://localhost:5000/todos")
        .then(res => res.json())
        .then(data => setDescription(data))
    },[]);

    async function handleDelete(id)
    {
        const response = await fetch(`http://localhost:5000/todos/${id}`,{
            method:"DELETE"
        })
        console.log(response);
        setDescription(description.filter(item => (item.id !== id)));
    }

     function showData()
    {
        let data =[];
        description.map(item =>(
            data.push(
                <tr key={item.id}>
                    <td>{item.description}</td>
                    <td><EditTodo id={item.id} desc={item.description}/></td>
                    <td><button className="btn btn-danger" onClick={ () => {handleDelete(item.id)}}>Delete</button></td>
                </tr>
            )
        ))
        return data;
    }

    return(
        <Fragment>
             <table className="mt-5 table text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
     <tbody>
        {showData()}
    </tbody>
    </table>
        </Fragment>
    )
}
