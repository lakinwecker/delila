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
export const importFile = Message<File>('import::importFile')
export const updateProgress = Message<Progress>('import::updateProgress')

//--------------------------------------------------------------------------------------------------
export interface ImportFileState extends Progress, File {}

//--------------------------------------------------------------------------------------------------
export type Remote = RemoteInterface<ImportFileState>;

//--------------------------------------------------------------------------------------------------
export function factory(): Remote {
  let initialState = { path: undefined, activity: "waiting", progress: 0 }
  let remote = new RemoteInterface<ImportFileState>(
    initialState,
    [new OutgoingMessage<ImportFileState, File>('import::importFile', importFile)],
    [new IncomingMessage<ImportFileState, Progress>('import::updateProgress', updateProgress)]
  );
  return remote;
}
