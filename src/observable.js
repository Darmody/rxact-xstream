// @flow
import { MemoryStream, Stream } from 'xstream'

interface ISubscriptionObserver {
  next(value: any): void,
  error(errorValue: Error): void,
  complete(): void,
  +closed?: Boolean,
}

interface ISubscription {
  unsubscribe(): void,
  +closed?: Boolean,
}

type SubscriberFunction = ISubscriptionObserver => (void => void) | ISubscription

Stream.prototype._xsSubscribe = Stream.prototype.subscribe
Stream.prototype.subscribe = function subscribe(onNext, onError, onComplete) {
  let listener

  if (onNext && typeof onNext.next === 'function') {
    listener = onNext
  } else {
    listener = {
      next: onNext,
      error: onError,
      complete: onComplete,
    }
  }

  return this._xsSubscribe(listener)
}

export default class XStreamObservable extends MemoryStream {
  constructor(subscriber: SubscriberFunction) {
    let subscription = null
    const producer = {
      _start: (listener) => {
        listener.next = listener._n
        listener.error = listener._e
        listener.complete = listener._c

        subscription = subscriber(listener)
      },
      _stop: () => {
        if (subscription) {
          subscription.unsubscribe()
        }
      },
    }

    super(producer)
  }
}
