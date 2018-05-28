import React from 'react'

const NewPerson = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.personHandler}>
                <div>
                    nimi: <input value={props.name}
                        onChange={props.nameHandler} />
                </div>
                <div>
                    numero: <input value={props.number}
                        onChange={props.numberHandler} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default NewPerson