import React from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.hyva === 0
        && props.neutraali === 0 && props.huono === 0) {
        return (
            <div>
                <h1>statistiikka</h1>
                <div>
                    <p>ei yhtään palautetta annettu</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>statistiikka</h1>
            <div>
                <table>
                    <tbody>
                        <Statistic text="hyvä" arvo={props.hyva} />
                        <Statistic text="neutraali" arvo={props.neutraali} />
                        <Statistic text="huono" arvo={props.huono} />
                        <Statistic text="keskiarvo" arvo={Keskiarvo(props)} />
                        <Statistic text="positiivisia" arvo={Positiivisia(props)} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const Statistic = (props) => {
    if (props.text === "positiivisia") {
        return (
            <tr>
                <td>{props.text}</td>
                <td>{props.arvo}%</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.arvo}</td>
        </tr>
    )
}

const Positiivisia = (props) => {
    let posPros = (props.hyva / (props.hyva + props.neutraali + props.huono)) * 100

    if (isNaN(posPros)) {
        return 0
    }
    return (
        Math.round(posPros * 10) / 10
    )
}

const Keskiarvo = (props) => {
    let ka = (props.hyva * 1 + props.huono * -1) /
        (props.hyva + props.neutraali + props.huono)

    if (isNaN(ka)) {
        return 0
    }
    return (
        Math.round(ka * 10) / 10
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    klikButton = (arvo, text) => {
        if (text === "hyvä") {
            return () => {
                this.setState({ hyva: arvo })
            }
        }
        if (text === "neutraali") {
            return () => {
                this.setState({ neutraali: arvo })
            }
        }
        if (text === "huono") {
            return () => {
                this.setState({ huono: arvo })
            }
        }
    }

    render() {
        return (
            <div>
                <h1> anna palautetta </h1>
                <div>
                    <Button handleClick={this.klikButton(this.state.hyva + 1, "hyvä")} text="hyvä" />
                    <Button handleClick={this.klikButton(this.state.neutraali + 1, "neutraali")} text="neutraali" />
                    <Button handleClick={this.klikButton(this.state.huono + 1, "huono")} text="huono" />
                </div>
                <Statistics hyva={this.state.hyva} huono={this.state.huono}
                    neutraali={this.state.neutraali} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))