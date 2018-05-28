import React from 'react'
import ReactDOM from 'react-dom'

const notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: true
    }
]

const Note = ({ note }) => {
    return (
        <li>{note.content}</li>
    )
}


const App = ({ notes }) => {
    return (
        <div>
            <h1>Muistiinpanot</h1>
            <ul>
                {notes.map(note => <Note key={note.id} note={note} />)}
            </ul>
        </div>
    )
}

ReactDOM.render(
    <App notes={notes} />,
    document.getElementById('root')
)