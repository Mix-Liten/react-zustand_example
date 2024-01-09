import { useEffect } from 'react'
import { useCounterStore } from './store'

function initCount() {
  useCounterStore.setState({ count: 1 })
}

function Counter({ count }: { count: number }) {
  const { increment, incrementAsync, decrement } = useCounterStore.getState()

  useEffect(() => {
    initCount()
  }, [])

  return (
    <div>
      <p style={{ textAlign: 'center' }}>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={incrementAsync}>+~</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default Counter
