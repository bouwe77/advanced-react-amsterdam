// build a basic toggle component

import React from 'react'
import {Switch} from '../switch'

function Toggle({onToggle}) {
  // 🐨 this toggle component is going to need to have state for `on`

  const [on, updateOn] = React.useState(false) // deze false is de initiele waarde voor de 'on'
  // on is de variabele die state bevat
  //updateOn is de functie die state update

  // Kent gebruikt geen arrow functions omdat het dan niet uitmaakt waar de functie staat,
  // boven of onderin de plek waar de functie wordt aangeroepen.
  // Zelf gebruik ik arrow functions in classes omdat ik dan de this gebind is.
  // Bovendien heeft hij nog nooit class components gemaakt (als ik het goed heb begrepen)
  // Met hooks hoeft dat ook niet meer natuurlijk? Voor mjn workshop: heeft het nog nut om class components te maken?
  function toggle() {
    const newOn = !on
    updateOn(newOn)
    onToggle(newOn)
  }

  // 🐨 render the Switch here and pass `on` and `onClick`
  return <Switch on={on} onClick={toggle} />
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Build Toggle'

export default Usage
