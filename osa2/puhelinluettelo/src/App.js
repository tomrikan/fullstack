import React from 'react';

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (isEqual(a[i], obj)) {
            return true
        }
    }
    return false
}

function isEqual(obj1, obj2) {
    if (obj1.name === obj2.name) {
        return true
    }
    return false
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-654321' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        console.log(event.target)

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        console.log(this.state.newName)
        console.log(this.state.persons)

        if (contains(this.state.persons, personObject) === false) {
            const uusPersons = this.state.persons.concat(personObject)
            this.setState({
                persons: uusPersons,
                newName: '',
                newNumber: ''
            })
        } else {
            this.setState({
                newName: '',
                newNumber: ''
            })
        }
    }

    handleNewName = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNewNumber = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleConstraint = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Constraint filter={this.state.filter} handler={this.handleConstraint} />
                <AddNewPerson personHandler={this.addPerson} name={this.state.newName}
                    nameHandler={this.handleNewName} number={this.state.newNumber}
                    numberHandler={this.handleNewNumber} />
                <h2>Numerot</h2>
                <div>
                    <DisplayPersons persons={this.state.persons} filter={this.state.filter} />
                </div>
            </div>
        )
    }
}

const AddNewPerson = (props) => {
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

const Constraint = (props) => {
    return (
        <div>
            rajaa: <input value={props.filter}
                onChange={props.handler} />
        </div>
    )
}

const DisplayPersons = (props) => {
    const toShow = props.persons.filter(function (person) {
        return person.name.toLowerCase().includes(props.filter.toLowerCase())
    })
    return (
        <div>
            <table>
                <tbody>
                    {toShow.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default App