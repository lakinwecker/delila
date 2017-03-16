
export class Server {
  protected ws?: WebSocket = undefined;
  protected is_open: boolean = false;
  protected unsent_messages: string[] = [];

  constructor(url: string) {
    this.ensure_running(url);
  }
  send(message: string) {
    if (!this.ws) {
      this.unsent_messages.push(message);
    } else {
      this.ws.send(message)
    }
  }

  ensure_running(url: string) {
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      this.is_open = true;
      while(this.unsent_messages && this.ws) {
        let message = this.unsent_messages.pop();
        this.ws.send(message);
      }
    }
    this.ws.onclose = () => {
      this.is_open = false;
      console.error("The server stopped");

      // TODO: restart server/re-close in with a timeout that
      // slows down and eventually gives up.
      // this.ensure_running(url);
    }
    this.ws.onmessage = (evt) => {
      console.log("Message: " + evt.data)
    }
  }
}
