import { fixtures } from "../lib"

test("returns path and read/write functions", async () => {
  let { path, read, write } = await fixtures(
    __dirname,
    "fixtures"
  )
  expect(typeof path).toBe("string")
  expect(read).toBeInstanceOf(Function)
  expect(write).toBeInstanceOf(Function)
})

test("reads fixture", async () => {
  let { read } = await fixtures(__dirname, "fixtures")
  expect(await read("test.json")).toEqual({
    hello: "world",
  })
  expect(await read("test.txt")).toBe("hello\n")
})

test("writes fixture", async () => {
  let { read, write } = await fixtures(
    __dirname,
    "fixtures"
  )
  let hello = { hello: "universe" }

  await write("test.json", hello)
  expect(await read("test.json")).toEqual(hello)

  await write("test.txt", "hi")
  expect(await read("test.txt")).toBe("hi")
})
