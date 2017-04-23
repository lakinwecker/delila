//--------------------------------------------------------------------------------------------------
// A simple WebSocket wrapped in a singleton so that we have a single point of access to the server.
export class Connection {
  private static _instance?:Connection = undefined;
  ws: WebSocket;

  //------------------------------------------------------------------------------------------------
  public static getInstance(): Connection {
    if (!Connection._instance) {
      Connection._instance = new Connection()
    }
    return Connection._instance
  }

  //------------------------------------------------------------------------------------------------
  constructor() {}

  //------------------------------------------------------------------------------------------------
  connect(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => this.onopen()
    this.ws.onclose = () => this.onclose()
  }

  //------------------------------------------------------------------------------------------------
  onopen() {}

  //------------------------------------------------------------------------------------------------
  onclose() {}
}

