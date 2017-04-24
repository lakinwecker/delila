import { Message } from 'kaiju'
import { Remote, Outgoing, Incoming }from "./task"

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
export const updateProgress = Message<Progress>('importFile')

//--------------------------------------------------------------------------------------------------
interface ImportFileState extends Progress, File {}

//--------------------------------------------------------------------------------------------------
export default function () {
  let initialState = { filePath: undefined, activity: "waiting", progress: 0 }
  let remote = new Remote<ImportFileState>(
    initialState,
    [new Outgoing<ImportFileState, File>(importFile)],
    [new Incoming<ImportFileState, Progress>(updateProgress)]
  );
  return remote;
}
