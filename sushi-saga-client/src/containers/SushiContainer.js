import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const allSushi = props.sushi.map(sushi => {
    return <Sushi sushi={sushi} key={sushi.id} eatSushi={props.eatSushi}/>
  })

  return (
    <Fragment>
      <div className="belt">
          {allSushi}
        <MoreButton moreSushi={props.moreSushi} />
      </div>
    </Fragment>
  )
}

export default SushiContainer