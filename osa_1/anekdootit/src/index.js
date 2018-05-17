import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }

    asetaArvoon = (arvo) => {
        return () => {
            this.setState({ selected: arvo })
        }
    }

    voteKlik = (arvo) => {
        const kopio = [...this.state.pisteet]
        kopio[arvo] += 1
        return () => {
            this.setState({ pisteet: kopio })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Button
                        handleClick={this.voteKlik(this.state.selected)}
                        text="vote"
                    />
                    <Button
                        handleClick={this.asetaArvoon(Random())}
                        text="next anecdote"
                    />
                </div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.pisteet[this.state.selected]} votes </p>
                <MostVoted index={indexOfMax(this.state.pisteet)}
                anecdotes={this.props.anecdotes} votes={this.state.pisteet}/>
            </div>
        )
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

const MostVoted = (props) => {
    
    return (
        <div>
            <h3>anecdote with most votes:</h3>
            <p>{props.anecdotes[props.index]}</p>
            <p>has {props.votes[props.index]} votes </p>
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Random = () => {
    let y = Math.floor(Math.random() * (5 - 0 + 1)) + 0
    console.log(y)
    return (
        y
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)