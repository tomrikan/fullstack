import React from 'react'

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>
const Otsikko = ({ nimi }) => <h1>{nimi}</h1>
const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}
const Yhteensa = ({ osat }) => {

    return (
        <p>yhteensä {osat.reduce((a, o, i, p) => a + o.tehtavia, 0)} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi