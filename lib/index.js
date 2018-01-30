import {
  copy,
  readFile,
  readJson,
  writeFile,
  writeJson,
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
    file = resolve(path, file)

    if (isJson(file)) {
      return await readJson(file)
    } else {
      return (await readFile(file)).toString()
    }
  }
}

export function writer(path) {
  return async (file, data) => {
    file = resolve(path, file)

    if (isJson(file)) {
      return await writeJson(file, data)
    } else {
      return await writeFile(file, data)
    }
  }
}

function isJson(file) {
  return extname(file) == ".json"
}
