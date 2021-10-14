import { render } from '@testing-library/react'
import { Counter } from '../Counter'

describe('<Counter/>', () => {
  it('should increase counter', () => {
    const { getByTestId, getByText } = render(<Counter />)

    getByText('+1').click()

    expect(getByTestId('counter')).toHaveTextContent('1')
  })
})
