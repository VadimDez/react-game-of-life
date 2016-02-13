/**
 * Created by vadimdez on 09/02/16.
 */
import React from 'react'

class Cell extends React.Component {
  constructor() {
    super()
    this.life = 0
  }

  changeState() {
    this.life = 1
    this.forceUpdate()
  }

  render() {
    return (
      <span onClick={this.changeState.bind(this)}>{this.life}</span>
    )
  }
}

export default Cell