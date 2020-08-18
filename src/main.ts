import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const input = await utility.getInputAny()

    await action.processAccess(input)
  } catch (error) {
    core.setFailed(error.message)
  }
}
