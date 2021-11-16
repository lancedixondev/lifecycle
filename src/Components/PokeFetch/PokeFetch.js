import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: [],
      seconds: 10
    }
    this.timer = 0;
    this.startTimer=this.startTimer.bind(this);
    this.countDown=this.countDown.bind(this);
  }

  fetchPokemon() {
    console.log("Pokemon Called")

    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      //.then(this.countDown())
      .catch((err) => console.log(err))
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  // componentDidMount()
  countDown() {
    console.log("Count Down Called")

    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }

  }

  startTimer(){
    console.log("Start Timer Called")
    //clearInterval(this.timer);

    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }

    if (this.state.time.s > (0)) {
        return(
          <img className='pokeImg-hidden' alt={this.state.pokeName} src={this.state.pokeSprite} />
          
        )
      
    } else {
      return(
        <div>
            <img className='pokeImg' alt={this.state.pokeName} src={this.state.pokeSprite} />
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      )
    }
  }

  render() {

    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.startTimer(); this.fetchPokemon() }}>Start!</button>
        <h1 className={'timer'} >Timer: {this.state.time.s}s</h1>
        <div className={'pokeWrap'}>

          
        </div>
      </div>
    )
  }
}

export default PokeFetch;