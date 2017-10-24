<h1 align="center">Rxact Xstream</h1>

[![npm version](https://img.shields.io/npm/v/rxact-xstream.svg?style=flat-square)](https://www.npmjs.com/package/rxact-xstream)
[![CircleCI master](https://img.shields.io/circleci/project/github/Darmody/rxact-xstream/master.svg?style=flat-square)](https://circleci.com/gh/Darmody/rxact-xstream/tree/master)
[![Coveralls master](https://img.shields.io/coveralls/github/Darmody/rxact-xstream/master.svg?style=flat-square)](https://coveralls.io/github/Darmody/rxact-xstream)

Rxact Xstream is a Rxact plugin for adding Xstream supporting to Rxact.


## Installation

```
  yarn add rxact rxact-xstream
```

## Usage

```javascript
  import { setup, StateStream } from 'rxact'
  import { Observable } from 'rxact-xstream'

  setup({ Observable: Observable })
  // it works now.

  const stream = new StateStream('stream', { name: 'rxact' })

  // state$ is a xstream instance now.
  stream.state$
  ...
```

## License

[MIT](https://github.com/Darmody/rxact-xstream/blob/master/LICENSE)
