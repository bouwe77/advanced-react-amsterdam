// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function Toggle({onToggle, ...rest}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return <ToggleContext.Provider value={{on: on, toggle: toggle}} {...rest} />
}

Toggle.On = function On({children}) {
  const {on} = React.useContext(ToggleContext)
  return on ? children : null
}

Toggle.Off = function Off({children}) {
  const {on} = React.useContext(ToggleContext)
  return on ? null : children
}

Toggle.Button = function Button({...props}) {
  const {on, toggle} = React.useContext(ToggleContext)
  return <Switch on={on} onClick={toggle} {...props} />
}

/*
Mijn aantekeningen:
===================
* De 100 opdracht hieronder: De Toggle.Button component moet binnen een Toggle component
worden gerendered omdat je anders de context niet hebt. Dus overal waar je nu de React.useContext
doet zou je moeten checken of 'ToggleContext' er wel is. Zo niet, gooi dan een error waarin je aangeeft
dat Toggle.Button component  binnen een Toggle component moet renderen.
* Verder is een tip om de useCallback/useMemo hook te gebruiken om te voorkomen dat er te vaak rerendered wordt.
Dus daar maar ook even naar kijken.
*/

// 💯 Comment out the Usage function below, and use this one instead:
// const Usage = () => <Toggle.Button />
// Why doesn't that work? Can you figure out a way to give the developer a
// better error message?

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return (
    <div>
      <Toggle onToggle={(...args) => console.info('onToggle', ...args)}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <div>
          <Toggle.Button />
        </div>
      </Toggle>
    </div>
  )
}
Usage.title = 'Flexible Compound Components'

export default Usage
