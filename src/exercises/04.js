// custom hooks
import React from 'react'
import {Switch} from '../switch'

// In JavaScript, when you have a group of lines of code, you can easily reuse
// that code by extracting it into a function which accepts arguments and
// returns some values.

// React comes with built-in hooks and we use those in our function components.
// Let's say that some logic we've written in a function component is really
// useful and we'd like to reuse it in other function components.

// Whelp, you do the same thing in that case as you would with regular
// JavaScript functions. Extract the logic from where it is and put it in a
// function, then call that function from where it was before.

// 🐨 create a function called `useToggle` and move all the toggle logic to
// that function then call `useToggle` in the Toggle function.

/*
Mijn aantekeningen:
===================
Wat we hier hebben gedaan is een custom hook gemaakt.
Als ik dit goed begrijp kan kan ik nu een ander "booleanachtig" component maken
die ook kan togglen, maar er anders uitziet.
Een custom hook is een function die andere hooks aanroept. Voor de rest is custom hook gewoon een
function. Deze oefeneing was dus puur een refactor slag, niks specifieks React.
*/

function useToggle(onToggle) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return [on, toggle]
}

function Toggle({onToggle}) {
  const [on, toggle] = useToggle({onToggle})
  return <Switch on={on} onClick={toggle} />
}

// 💯 Switch the `useToggle` from `useState` to `useReducer` without breaking
// the API of your `useToggle` custom hook.

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}

Usage.title = 'Custom hooks'

export default Usage
