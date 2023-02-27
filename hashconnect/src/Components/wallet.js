import React from 'react'
// import { useState } from 'react'

export default function Wallet() {
  let text ;
  const handleChange =()=>{
    console.log('clicked on this ')
  }
  return (
    <div class='container'>
        <h1> Transection with out hashpack</h1>
        <input class="form-control" type="text" value={text} onchange={handleChange()}aria-label="readonly input example" readonly></input>
        
        <button class="btn btn-primary" type="button" onClick>enter your private key</button>
      </div>
  )
}



