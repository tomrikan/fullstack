import React from 'react';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    componentDidMount() {
        console.log('will mount')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                this.setState({ countries: response.data })
            })
    }

    render() {
        return (
            <div>
                <div>
                    find countries: <input value={this.state.filter}
                        onChange={this.handleFilter} />
                </div>
                <div>
                    <DisplayCountries countries={this.state.countries} filter={this.state.filter} />
                </div>

            </div>
        )
    }
}

const DisplayCountries = (props) => {
    const toShow = props.countries.filter(function (country) {
        return country.name.toLowerCase().includes(props.filter.toLowerCase())
    })
    if (toShow.length > 10) {
        return (
            <p>too many matches, specify another filter</p>
        )
    }
    if (toShow.length === 1) {
        return (
            <div>
                <h1>{toShow[0].name} {toShow[0].nativeName}</h1>
                <p>capital: {toShow[0].capital} </p>
                <p>population: {toShow[0].population} </p>
                <img width="150" height="100" src={toShow[0].flag} />
            </div>
        )
    }
    return (
        toShow.map(country => <p key={country.name}> {country.name} </p>)
    )
}

export default App