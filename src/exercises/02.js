// Compound Components
import React from 'react'
import {Switch} from '../switch'

// Compound components are components that work together to form a complete UI.
// The classic example of this is <select> and <option> in HTML:
//
// <select>
//   <option value="1">Option 1</option>
//   <option value="2">Option 2</option>
// </select>
//
// the <select> is the element responsible for managing the state of the UI, and
// the <option> elements are essentially more configuration for how the select
// should operate (specifically, which options are available and their values).
//
// In this example, people want to use the Toggle the same way they can use a
// select. We have a Toggle component that manages the state, and we want to
// render different parts of the UI however we want. We want control over the
// presentation of the UI.

// 🦉 The fundamental challenge you face with an API like this is the state
// shared between the components is implicit, meaning that the developer using
// your component cannot actually see or interact with the state (`on`) or the
// mechanisms for updating that state (`toggle`) that are being shared between
// the components.
// So in this exercise, we'll solve that problem by providing the compound
// components with the props they need implicitely using React.cloneElement.

// Since we're no longer responsible for rendering the switch ourselves,
// we'll need to accept a `children` prop and render that instead.
// 🐨 add `children` to the props destructuring here
function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  /*
Mijn aantekeningen:
Die twee linkjes bekijken reactchildren en cloneelement.
Verder zijn die 3 Toggle.On, Toggle.Off en Toggle.Button arrow functions. En ik weet niet waarom...
Het gebruik van de components zit in de Usage function, daar zie je dat je ze nest zeg maar.
*/

  // 🐨 replace this with a call to React.Children.map and map each child to
  // a clone of that child with the props they need using React.cloneElement
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  //return <Switch on={on} onClick={toggle} />
  return React.Children.map(children, child =>
    React.cloneElement(child, {on, toggle}),
  )
}

// Accepts `on` and `children` props and returns `children` if `on` is true
Toggle.On = ({on, children}) => (on ? children : null)

// Accepts `on` and `children` props and returns `children` if `on` is false
Toggle.Off = ({on, children}) => (on ? null : children)

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
Toggle.Button = ({on, toggle}) => <Switch on={on} onClick={toggle} />

// 💯 Support rendering non-Toggle components within Toggle without incurring warnings in the console.
// for example, try to render a <span>Hello</span> inside <Toggle />

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
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
