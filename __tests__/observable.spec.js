import { isObservable } from 'rxact'
import Observable from '../src/observable'

describe('Observable', () => {
  it('exposes the public API', () => {
    const observable = new Observable(() => {})

    expect(isObservable(observable)).toBeTruthy()
    expect(observable.subscribe).toBeDefined()
  })

  it('exposes the static API', () => {
    expect(Observable.of).toBeDefined()
    expect(Observable.from).toBeDefined()
  })

  it('construct with SubscriptionObserver', () => {
    const observable = new Observable(observer => {
      observer.next(0)

      return {
        unsubscribe: () => {}
      }
    })
    const mockSubscriber = jest.fn()

    observable.subscribe(mockSubscriber)

    expect(mockSubscriber.mock.calls).toEqual([[0]])
  })

  it('subscribe() with observer', () => {
    const observable = new Observable(observer => {
      observer.next(0)

      return {
        unsubscribe: () => {}
      }
    })
    const mockSubscriber = jest.fn()

    const observer = {
      next: mockSubscriber
    }

    observable.subscribe(observer)

    expect(mockSubscriber.mock.calls).toEqual([[0]])
  })

  it('subscribe() with onNext, onComplete, onError', () => {
    const observable = new Observable(observer => {
      observer.next(0)

      return {
        unsubscribe: () => {}
      }
    })
    const mockSubscriber = jest.fn()

    observable.subscribe(mockSubscriber)

    expect(mockSubscriber.mock.calls).toEqual([[0]])
  })

  it('unsubscribe', (done) => {
    const mockFn = jest.fn()
    const observable = new Observable(() => {
      return {
        unsubscribe: () => {
          mockFn()
          expect(mockFn.mock.calls.length).toEqual(1)
          done()
        },
      }
    })

    const subscription = observable.subscribe()

    subscription.unsubscribe()
  })
})
