import '@testing-library/jest-dom'
import 'jest-axe'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R
    }
  }
}

