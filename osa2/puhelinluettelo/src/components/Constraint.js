import React from 'react'

const Constraint = (props) => {
    return (
        <div>
            rajaa: <input value={props.filter}
                onChange={props.handler} />
        </div>
    )
}

export default Constraint