import React from 'react'

const Person = ({person, deleteHandler}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td>
        <td><button onClick={deleteHandler}>poista</button></td></tr>
    )
}

export default Person