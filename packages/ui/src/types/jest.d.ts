import { AxeMatchers } from 'jest-axe'

declare global {
  namespace jest {
    interface Matchers<_R> extends AxeMatchers {}
  }
}