import { useState } from 'react'

export const Counter = (): JSX.Element => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Counter</h2>

      <div style={{ display: 'flex' }}>
        <button onClick={() => setCount(c => c + 1)}>+1</button>

        <div data-testid="counter">{count}</div>

        <button onClick={() => setCount(c => c - 1)}>-1</button>
      </div>
    </div>
  )
}
