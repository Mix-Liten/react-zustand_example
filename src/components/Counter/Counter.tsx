import { useEffect } from 'react'
import { useCounterStore } from './store'

import './Counter.css'

function initCount() {
  useCounterStore.setState({ count: 1 })
}

function Counter({ count }: { count: number }) {
  const { increment, incrementAsync, decrement, decrementAsync } = useCounterStore.getState()

  useEffect(() => {
    initCount()
  }, [])

  return (
    <div className="wrapper-root">
      <p className="content">
        Current count: <br />
        {count}
      </p>
      <div className="wrapper">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <div className="wrapper">
        <button onClick={incrementAsync} title="delay increment">
          (+)
        </button>
        <button onClick={decrementAsync} title="delay decrement">
          (-)
        </button>
      </div>
    </div>
  )
}

export default Counter
