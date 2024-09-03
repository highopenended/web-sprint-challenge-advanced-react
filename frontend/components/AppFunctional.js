import React from 'react'
import { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [index, setIndex] = useState(initialIndex);
  const [message, setMessage] = useState(initialMessage);
  const [stepCount, setStepCount] = useState(0);

  const [email, setEmail] = useState(initialEmail)

  
  function indexToXY(index){
    let x = (index % 3) + 1
    let y = Math.floor(index / 3) + 1
    return [x, y]
  }

  function xyToIndex(x, y) {
    return x + ((y-1)*3)-1
  }


  function getXYMessage(direction) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `You can't go ${direction}`
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex)
    setMessage(initialMessage)
    setStepCount(initialSteps)
  }

  function getNextIndex(direction) {
    let arr=indexToXY(index)
    let x = arr[0]
    let y = arr[1]
    switch(direction){
      case 'left':
        x=Math.max(x-1,1)
        break;
      case 'right':
        x=Math.min(x+1,3)
        break;
      case 'up':
        y=Math.max(y-1,1)
        break;
      case 'down':
        y=Math.min(y+1,3)
        break;
    }
    return xyToIndex(x,y)
  }

  function move(evt) {
    const direction = evt.target.id
    const squareArr = document.getElementById('grid').childNodes
    let currIdx, newIdx, newSteps, newMsg 

    for (let i = 0; i < squareArr.length; i++) {
      const square = squareArr[i];
      if(square.className==="square active"){
        currIdx = i
      } 
    }
    newIdx=getNextIndex(direction)
    if(currIdx===newIdx){
      newSteps=stepCount
      newMsg=getXYMessage(direction)
    }else{
      newSteps=stepCount+1
      newMsg=''
    }
    
    setIndex(newIdx)
    setMessage(newMsg)
    setStepCount(newSteps)
  }



  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.value)
  }
  function onSubmit(evt) {
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${indexToXY(index)[0]}, ${indexToXY(index)[1]})`}</h3>
        <h3 id="steps">{`You moved ${stepCount} times`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={(e)=>move(e)} id="left">LEFT</button>
        <button onClick={(e)=>move(e)} id="up">UP</button>
        <button onClick={(e)=>move(e)} id="right">RIGHT</button>
        <button onClick={(e)=>move(e)} id="down">DOWN</button>
        <button onClick={()=>reset()} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email" onChange={(e)=>onChange(e)} value={email}></input>
        <input onClick={(e)=>onSubmit(e)} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
