export default interface Rule {
  id?: string,
  pattern: {
    field: string,
    value: string
  },
  rule: {
    field: string,
    value: string | string[]
  }
}
