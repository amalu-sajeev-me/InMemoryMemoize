
# InMemoryMemoize

_nodejs InMemoryMemoize is a key => value memoization package with no other dependancies which makes use of latest javascript technologies_


## Installation

Install InMemoryMemoize with npm

```bash
  npm i inmemorymemoize
```
    
## Features

- Light weight
- no dependancies
- Typescript support
- in memory memoization
- multiple memory stores
- supports Stream


## Documentation

[Documentation](https://linktodocumentation)

```javascript
// ES6
import { InMemoryMemoize } from "inmemorymemoize";

// CommonJS
const { InMemoryMemoize } = require("inmemorymemoize");
```

### How to

1. first you have to create a new instance of your memoization memory

##### javascript
```javascript

const user = new InMemoryMemoize(name, options);
```
##### TypeScript
```javascript

const user = new InMemoryMemoize<string | number>(name, options);
```
> InMemoryMemoize constructor accepts two parameters

``name`` is a string which denotes the memory name and ``options`` is an optional parameter which is an object to configure the memory if needed.

2. Add entries to the memory

```javascript
user.add("name", "john");
```
> Note: ``instance.add(key, value)`` method can also be chained.
```javascript
user.add("name", "john").add("age", 25).add("gender", "male");
```

``instance.add(key, value)`` _method always accepts two parameters. a key and a value. ``key`` should always be a ``string``. and ``value`` can be of any javascript type_

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Authors

- [@amalu-sajeev-me](https://github.com/amalu-sajeev-me)


## Support

For support, email amalu.sajeev.me@gmail.com


## Tech Stack

**Client:** not-supported currently

**Server:** Node


## 🚀 About Me
I'm a full stack developer...


# Hi, I'm Amalu! 👋


## 🛠 Skills
Javascript, HTML, CSS, JQuery, SASS, TypeScript, NodeJS, EXPRESS, MongoDB, GraphQL, TypeGraphQL, DynamoDB 

