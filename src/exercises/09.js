// control props
import React from 'react'
import {Switch} from '../switch'

// Sometimes, people want to be able to manage the internal state of our
// component from the outside. The state reducer allows them to manage what
// state changes are made when a state change happens, but sometimes people
// may want to make state changes themselves. We can allow them to do this with
// a feature called "Control Props"

// In this example, we've created a <Toggle /> component which can accept a prop
// called `on` and another called `onChange`. These works similar to the `value`
// and `onChange` props of <input />. Your job is to make those props actually
// control the state of `on` and call the `onChange` with the suggested chagnes.

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case useToggle.types.toggle: {
      return {on: !state.on}
    }
    case useToggle.types.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({
  onChange = noop,
  initialOn = false,
  reducer = toggleReducer,
  on: controlledOn,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const onIsControlled = controlledOn !== undefined

  const on = onIsControlled ? controlledOn : state.on

  function dispatchWithOnChange(action) {
    dispatch(action)
    onChange(reducer({...state, on}, action), action)
  }

  function toggle() {
    // 🐨 instead of all this, we can now just call our `dispatchWithOnChange`
    dispatchWithOnChange({action: useToggle.types.toggle})
  }

  function reset() {
    // 🐨 instead of all this, we can now just call our `dispatchWithOnChange`
    dispatchWithOnChange({action: useToggle.types.reset, initialState})
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
    reset,
    toggle,
    getTogglerProps,
  }
}
useToggle.reducer = toggleReducer
useToggle.types = {
  toggle: 'toggle',
  reset: 'reset',
}

// 💯 This is fairly easy when you only have one element of state in your
// component (the `on` state in our case), but in a more complex component,
// you may have several elements of state you want the developer to be able to
// control. Once you have two, things get complicated quickly, and three or more
// is basically a nightmare.
// See if you can make a more generic abstraction to handle any number of
// elements of state in your component. Start by changing the Toggle component
// to call `useToggle` like this:
// `const {on, getTogglerProps} = useToggle({state: {on: controlledOn}, onChange})`
// Then make that work. To test it out, you could try adding another element
// of state to your toggle reducer.
//
// 💰 Hey, I get it, this one's really hard, let me give you a tip. In the final
// solution for this one, I replace `React.useReducer` with a custom hook:
// const [state, dispatch] = useControlledReducer(reducer, initialState, {
//   controlledState,
//   onChange,
// })
// That custom hook is responsible for managing EVERYTHING. The rest of the
// `useToggle` function looks just as if you weren't doing control props at all.
// Good luck!

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Toggle({on: controlledOn, onChange}) {
  // 💯 I, Hannah Hundred, give you permission to edit this function for
  // the extra credit outlined above. 😘
  const {on, getTogglerProps} = useToggle({on: controlledOn, onChange})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function Usage() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === useToggle.types.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick(params) {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}
Usage.title = 'Control Props'

export default Usage
// we're adding the Toggle export for tests
export {Toggle}
