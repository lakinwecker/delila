//--------------------------------------------------------------------------------------------------
// A simple WebSocket wrapped in a singleton so that we have a single point of access to the server.
//--------------------------------------------------------------------------------------------------

interface IncomingMessageCallback { (jsonString: string): void }
interface CallbackMap {
  [key: string]: IncomingMessageCallback;
}

interface Message { id: number, name: string, args: string };

export class Connection {
  private static _instance?:Connection = undefined;
  private static idSequence:number = 0;
  private callbacks: CallbackMap;
  ws: WebSocket;
  private unsentMessages: Array<Message> = [];

  public static getInstance(): Connection {
    if (!Connection._instance) {
      Connection._instance = new Connection()
    }
    return Connection._instance
  }

  public static uniqueId(): number {
    return Connection.idSequence += 1
  }

  constructor() {
    this.callbacks = {};
  }

  connect(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      this.sendUnsentMessages()
      this.onopen()
    }
    this.ws.onclose = () => this.onclose()
    this.ws.onmessage = (event) => {
      let message = JSON.parse(event.data);
      // TODO: validate the incoming json structure is appropriate (Not the args, just the message container)
      // TODO: much of this id mapping should probably go to the store. We should probably only map
      //       the id to the store.
      let key = "" + message.id + message.name;
      let callback: IncomingMessageCallback = this.callbacks[key];
      if (callback) {
        callback(message.args);
      }

    }
  }

  sendUnsentMessages() {
    var unsentMessages = this.unsentMessages;
    this.unsentMessages = [];
    unsentMessages.forEach((msg) => this.send(msg.id, msg.name, msg.args));
  }

  onopen() {}

  onclose() {}

  register(id: number, methodName: string, callback: IncomingMessageCallback) {
    let key = "" + id + methodName;
    this.callbacks[key] = callback;
  }

  send(id: number, name: string, args: string) {
    let message = {id: id, name: name, args: args};
    if (!this.ws) {
      this.unsentMessages.push(message)
    } else {
      this.ws.send(JSON.stringify(message))
    }
  }
}

