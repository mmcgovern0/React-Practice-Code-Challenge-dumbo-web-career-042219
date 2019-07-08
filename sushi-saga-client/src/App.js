import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state={
    sushi: [],
    index: 0,
    money: 100,
    funds: 0
  }

  componentDidMount(){
    fetch(API)
      .then(resp => resp.json())
      .then(sushiData => {

        let sushiArray = sushiData.map(sushi => {
          return {...sushi, eaten: false}
        })

        this.setState({sushi: sushiArray})
      })
  }

  moreSushi = () => {
    this.setState({index: this.state.index + 4})
  }

  eatSushi = (selectedSushi) => {

    if(this.state.money >= selectedSushi.price) {

      let currentMoney = this.state.money - selectedSushi.price

      let sushiArray = this.state.sushi.map(sushi => {
        if(selectedSushi === sushi) {
          sushi.eaten = true
          return sushi
        } else {
          return sushi
        }
      })
      this.setState({sushi: sushiArray, money: currentMoney})
    } else {
      alert("Ya Broke")
    }
  }

  handleChange = (event) => {
    this.setState({funds: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({money: this.state.money + this.state.funds})
  }

  render() {

    let sushiArray = this.state.sushi.slice(this.state.index, this.state.index + 4);

    let eatenSushi = this.state.sushi.filter(sushi => {
      return sushi.eaten;
    })

    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="number" name="cash" value={this.state.funds} onChange={this.handleChange}/>
          <input type="submit" />
        </form>
        <SushiContainer  sushi={sushiArray} moreSushi={this.moreSushi} eatSushi={this.eatSushi}/>
        <Table eatenSushi={eatenSushi} money={this.state.money}/>
      </div>
    );
  }
}

export default App;