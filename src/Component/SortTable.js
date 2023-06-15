import React, { useState, useEffect } from "react";
import axios from "axios";
import "./tabela.css"

function SortTable() {
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    const [todos, setTodos] = useState([])


    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((result) => {
                const data = [];
                console.table(result)
                result.data.forEach(user => {
                    data.push(user)
                })
                setData(data)
            })

        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((result) => {
                console.table(result.data)
                setPosts(result.data)
            })

        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((result) => {
                console.table(result.data)
                setTodos(result.data)
            })

    }, []);

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <th>NR</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Company Name</th>
                    <th>Posts</th>
                    <th>Todos</th>

                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr className="row-test" key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.company.name}</td>
                            <td>{posts.filter(post => post.userId === user.id).length}</td>
                            <td>{todos.filter(todo => (todo.userId === user.id && !todo.completed)).length}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>


        </div>
    )
}

export default SortTable 