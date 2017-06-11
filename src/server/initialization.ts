import { Message } from 'kaiju'
import { Remote as RemoteInterface, OutgoingMessage, IncomingMessage } from "./messages"

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
  // TODO: get the version number from a config file somewhere
  let initialState = { version: "0.1.0", activity: "Connecting", progress: 0, finished: false }
  let remote = new RemoteInterface<InitializeState>(
    initialState,
    [new OutgoingMessage<InitializeState, Version>('initialize::initialize', initialize)],
    [
      new IncomingMessage<InitializeState, Progress>('initialize::updateProgress', updateProgress),
      new IncomingMessage<InitializeState, Finished>('initialize::finished', finished)
    ]
  );
  console.log(remote.store);
  return remote;
}
