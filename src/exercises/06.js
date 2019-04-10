// prop getters

import React from 'react'
import {Switch} from '../switch'

// Uh oh! Someone wants to use our togglerProps object, but they need to apply
// their own `onClick` handler.

// 💰 You're gonna need this (I'll explain what it does later):
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({onToggle = noop} = {}) {
  const [{on}, dispatch] = React.useReducer(toggleReducer, {on: false})

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function getTogglerProps({onClick, ...rest} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...rest,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

/*
Mijn aantekeningen:
===================
Deze doet het niet, terwijl mijn code volgens mij wel goed is.
Kan ook aan CodeSandbox liggen
Het probleem is dat ik de console.log met "onButtonClick" niet zie... :()
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const {on, getTogglerProps} = useToggle({
    onToggle: (...args) => console.log('onToggle', ...args),
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.log('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
Usage.title = 'Prop Getters'

export default Usage
