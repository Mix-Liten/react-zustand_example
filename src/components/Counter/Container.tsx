import { CounterComponent, useCounterStore } from '.'

function Container() {
  const count = useCounterStore(state => state.count)

  return <CounterComponent count={count} />
}

export default Container
