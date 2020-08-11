import * as core from '@actions/core'
import * as utility from './utility'

export async function processAccess(input: any): Promise<void> {
  await get(input.get)
  await set(input.set)
}

async function get(input: any): Promise<void> {
  const keys = Object.keys(input)

  for (const key of keys) {
    const property = input[key]
    const output = await getProperty(key, property.input, property.path)

    core.setOutput(key, output)
  }
}

async function set(input: any): Promise<void> {
  const keys = Object.keys(input)

  for (const key of keys) {
    const property = input[key]
    const output = await setProperty(key, property.input, property.path, property.value)

    core.setOutput(key, output)
  }
}

async function getProperty(name: string, input: string, path: string): Promise<string> {
  const data = await utility.getDataAny(input)
  const value = utility.getValue(data.data, path)
  const result = utility.format(value, data.type)

  return result
}

async function setProperty(name: string, input: string, path: string, value: string): Promise<string> {
  const data = await utility.getDataAny(input)

  utility.setValue(data, path, value)

  const result = utility.format(data, data.type)

  return result
}
