import * as core from '@actions/core'
import * as utility from './utility'

export async function processAccess(input: any): Promise<void> {
  if (input.hasOwnProperty('get')) {
    await get(input.get)
  }

  if (input.hasOwnProperty('set')) {
    await set(input.set)
  }
}

async function get(input: any): Promise<void> {
  const keys = Object.keys(input)

  for (const key of keys) {
    const property = input[key]

    await getProperty(key, property.input, property.path)
  }
}

async function set(input: any): Promise<void> {
  const keys = Object.keys(input)

  for (const key of keys) {
    const property = input[key]

    await setProperty(key, property.input, property.path, property.value)
  }
}

async function getProperty(name: string, input: string, path: string): Promise<void> {
  const data = await utility.getDataAny(input)
  const value = utility.getValue(data.data, path)
  const result = utility.format(value, data.type)

  core.setOutput(name, result)
}

async function setProperty(name: string, input: string, path: string, value: string): Promise<void> {
  const data = await utility.getDataAny(input)

  utility.setValue(data, path, value)

  const result = utility.format(data, data.type)

  core.setOutput(name, result)

  await utility.writeData(path, data, data.type)
}
