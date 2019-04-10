// State Initializers

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialOn}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset': {
      return {on: initialOn}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({onToggle = noop, onReset = noop, initialOn = false} = {}) {
  const initialState = {on: initialOn}

  const [{on}, dispatch] = React.useReducer(toggleReducer, initialState)

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function reset() {
    dispatch({type: 'reset', initialOn})
    onReset(initialState.on)
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    reset,
    getTogglerProps,
  }
}

/*
Mijn aantekeningen:
===================
Als ik het goed heb begrepen is dat standaard reducer/action werk,
maar dan met state via useState.
De oplossing voor de Hannah 100 hieronder is gebruik van userRef. Eventueel even naar kijken...
*/

// 💯 What happens if the user of useToggle switches the `initialOn` state
// during the lifetime of this component? What should happen? I would argue that
// we should ignore the update and maintain the `initialOn` state at the time
// this is initially rendered. So your extra credit is to figure out how to
// maintain the initial state value so your initialState object remains the
// same for the lifetime of the component.

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const {on, getTogglerProps, reset} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
    onReset: (...args) => console.info('onReset', ...args),
    initialOn: false,
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Initializers'

export default Usage
