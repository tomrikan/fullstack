import React from 'react'
import personService from './services/persons'
import NewPerson from './components/NewPerson'
import Constraint from './components/Constraint'
import Person from './components/Person'
import './App.css'

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
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            success: ''
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        console.log(event.target)

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (contains(this.state.persons, personObject) === false) {
            personService.create(personObject).then(response => {
                this.setState({
                    persons: this.state.persons.concat(response.data),
                    newName: '',
                    newNumber: '',
                    success: `lisättiin ${personObject.name}`
                })
                setTimeout(() => {
                    this.setState({ success: null })
                }, 5000)
            })
        }
        else {
            this.setState({
                newName: '',
                newNumber: ''
            })
        }
    }

    handleDelete = (id) => {
        return () => {
            const person = this.state.persons.find(p => p.id === id)
            personService.remove(id).then(deleted => {
                this.componentDidMount()
                this.setState({
                    success: `poistettiin ${person.name}`
                })
            })
            setTimeout(() => {
                this.setState({ success: null })
            }, 5000)
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

    componentDidMount() {
        personService.getAll().then(response => {
            this.setState({ persons: response.data })
        })
    }

    render() {
        const personsToShow =
            this.state.filter.length === 0 ?
                this.state.persons :
                this.state.persons.filter(person => person.name.includes(this.state.filter))
        if (this.state.success !== '') {
            return (
                <div>
                    <h1>Puhelinluettelo</h1>
                    <Notification message={this.state.success} />
                    <Constraint filter={this.state.filter} handler={this.handleConstraint} />
                    <NewPerson personHandler={this.addPerson} name={this.state.newName}
                        nameHandler={this.handleNewName} number={this.state.newNumber}
                        numberHandler={this.handleNewNumber} />
                    <h2>Numerot</h2>
                    <div>
                        <table>
                            <tbody>
                                {personsToShow.map(person =>
                                    <Person
                                        key={person.name}
                                        person={person}
                                        deleteHandler={this.handleDelete(person.id)}
                                    />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h1>Puhelinluettelo</h1>
                <Constraint filter={this.state.filter} handler={this.handleConstraint} />
                <NewPerson personHandler={this.addPerson} name={this.state.newName}
                    nameHandler={this.handleNewName} number={this.state.newNumber}
                    numberHandler={this.handleNewNumber} />
                <h2>Numerot</h2>
                <div>
                    <table>
                        <tbody>
                            {personsToShow.map(person =>
                                <Person
                                    key={person.name}
                                    person={person}
                                    deleteHandler={this.handleDelete(person.id)}
                                />)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="success">
            {message}
        </div>
    )
}

export default App