export const STATES = {
  UT: { name: 'Utah', code: 'UT' },
  ID: { name: 'Idaho', code: 'ID' },
  NV: { name: 'Nevada', code: 'NV' },
  WY: { name: 'Wyoming', code: 'WY' },
} as const

export type StateCode = keyof typeof STATES

export const STATE_CODES = Object.keys(STATES) as StateCode[]

export const isValidStateCode = (code: string): code is StateCode => {
  return code in STATES
}

export const getStateName = (code: StateCode): string => {
  return STATES[code].name
}
