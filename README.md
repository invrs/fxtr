# Fxtr

Copy files to tmp and read/write them.

## Install

```bash
npm install --save-dev fxtr
```

## Usage

```js
import { fixtures } from "fxtr"

let { path, read, write } = await fixtures(__dirname, "fixtures")

write("test.json", { hello: "world" })
read("test.json") // { hello: "world" }
```
