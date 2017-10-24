describe('rxact-xstream', () => {
  it('exposes public API', () => {
    const rxactXstream = require('../src/index')

    expect(rxactXstream.Observable).toBeDefined()
  })
})
