import React from 'react'
// import { sortedFamObj } from './GenAll'
import Griddle, { plugins } from 'griddle-react'

const Table = (data) => {
    

    return (
        <div>
            <Griddle 
                data={data}
                plugins={[plugins.LocalPlugin]}
            />
        </div>
    )
}

export default Table