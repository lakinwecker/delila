import { Message } from 'kaiju'
import { Remote as RemoteInterface, OutgoingMessage, IncomingMessage } from "./messages"
import VERSION from "../version"

//--------------------------------------------------------------------------------------------------
interface Version {
  version: string
}
//--------------------------------------------------------------------------------------------------
interface Finished {
  finished: boolean
}
//--------------------------------------------------------------------------------------------------
interface Progress {
  activity: string,
  progress: number
}

//--------------------------------------------------------------------------------------------------
export const initialize = Message<Version>('initialize::initialize')
export const updateProgress = Message<Progress>('initialize::updateProgress')
export const finished = Message<Finished>('initialize::finished')

//--------------------------------------------------------------------------------------------------
export interface InitializeState extends Progress, Version, Finished {}

//--------------------------------------------------------------------------------------------------
export type Remote = RemoteInterface<InitializeState>;

//--------------------------------------------------------------------------------------------------
export function factory(): Remote {
  let initialState = { version: VERSION, activity: "Connecting", progress: 0, finished: false }
  let remote = new RemoteInterface<InitializeState>(
    initialState,
    [new OutgoingMessage<InitializeState, Version>('initialize::initialize', initialize)],
    [
      new IncomingMessage<InitializeState, Progress>('initialize::updateProgress', updateProgress),
      new IncomingMessage<InitializeState, Finished>('initialize::finished', finished)
    ]
  );
  return remote;
}
