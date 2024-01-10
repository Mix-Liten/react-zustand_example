import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CounterStore = {
  count: number
  increment: () => void
  incrementAsync: () => Promise<void>
  decrement: () => void
  decrementAsync: () => Promise<void>
}

export const useCounterStore = create<CounterStore>()(
  devtools(
    set => ({
      count: 0,
      increment: () => {
        set(state => ({ count: state.count + 1 }))
      },
      incrementAsync: async () => {
        await new Promise(resolve => setTimeout(resolve, 1e3))
        set(state => ({ count: state.count + 1 }))
      },
      decrement: () => {
        set(state => ({ count: state.count - 1 }))
      },
      decrementAsync: async () => {
        await new Promise(resolve => setTimeout(resolve, 1e3))
        set(state => ({ count: state.count - 1 }))
      },
    }),
    { name: 'counterStore' },
  ),
)
