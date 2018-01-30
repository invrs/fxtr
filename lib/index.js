import {
  copy,
  readFile,
  readJson,
  writeFile,
} from "fs-extra"
import { extname, resolve } from "path"
import tmp from "tmp-promise"

export async function fixtures(...paths) {
  let path = resolve(...paths)
  let dir = await tmp.dir()

  await copy(path, dir.path)

  return {
    path: dir.path,
    read: reader(dir.path),
    write: writer(dir.path),
  }
}

export function reader(path) {
  return async file => {
    let fn = isJson(file) ? readJson : readFile
    file = resolve(path, file)
    return await fn(file)
  }
}

export function writer(path) {
  return async (file, data) => {
    if (isJson(file)) {
      data = JSON.stringify(data, null, 2)
    }
    file = resolve(path, file)
    return await writeFile(file, data)
  }
}

function isJson(file) {
  return extname(file) == ".json"
}
