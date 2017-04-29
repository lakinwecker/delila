import { Message } from 'kaiju'
import { Remote as RemoteInterface, OutgoingMessage, IncomingMessage } from "./messages"

//--------------------------------------------------------------------------------------------------
interface File {
  path?: string
}

//--------------------------------------------------------------------------------------------------
interface Progress {
  activity: string,
  progress: number
}

//--------------------------------------------------------------------------------------------------
export const importFile = Message<File>('importFile')
export const updateProgress = Message<Progress>('updateProgress')

//--------------------------------------------------------------------------------------------------
export interface ImportFileState extends Progress, File {}

//--------------------------------------------------------------------------------------------------
export type Remote = RemoteInterface<ImportFileState>;

//--------------------------------------------------------------------------------------------------
export function factory(): Remote {
  let initialState = { path: undefined, activity: "waiting", progress: 0 }
  let remote = new RemoteInterface<ImportFileState>(
    initialState,
    [new OutgoingMessage<ImportFileState, File>('importFile', importFile)],
    [new IncomingMessage<ImportFileState, Progress>('updateProgress', updateProgress)]
  );
  return remote;
}
