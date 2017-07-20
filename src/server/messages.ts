// A remote messages can be sent and received via a store that maintains state.
//
// Each OutgoingMessage is simply sending a websocket message.
//
// Each IncomingMessage received updates the state of of the store Eezy-peezy
import { DefaultMessage } from 'kaiju'
import { update } from 'immupdate'
import { Store as StoreInterface, RegisterMessages } from 'kaiju/store'
import Store from 'kaiju/store'

import { Connection } from './connection'

// TODO: at some point we want this to be as type safe as possible. We can't quite
//       achieve that yet - but I want it to work like rocket.

export abstract class OutgoingMessageInterface<State> {
  abstract listen(on: RegisterMessages<State>, remote: Remote<State>): void;
}

export class OutgoingMessage<State, Interface> extends OutgoingMessageInterface<State> {
  private name: string
  private message: DefaultMessage<Interface>

  constructor(name: string, message: DefaultMessage<Interface>) {
    super()
    this.name = name
    this.message = message
  }

  listen(on: RegisterMessages<State>, remote: Remote<State>) {
    on(this.message, (state: State, v: Interface) => {
      let newState = update(state, v)
      remote.send(this.name, JSON.stringify(v))
      return newState
    })
  }
}

export abstract class IncomingMessageInterface<State> {
  abstract listen(on: RegisterMessages<State>): void;
  abstract register(id: number, connection: Connection, store: StoreInterface<State>): void;
}

export class IncomingMessage<State, Interface> extends IncomingMessageInterface<State> {
  private name: string
  private message: DefaultMessage<Interface>

  constructor(name: string, message: DefaultMessage<Interface>) {
    super()
    this.name = name
    this.message = message
  }

  register(id: number, connection: Connection, store: StoreInterface<State>) {
    connection.register(id, this.name, jsonString => {
      // TODO: Do some type based conversion/checking first!!
      store.send(this.message(JSON.parse(jsonString) as Interface));
    })
  }

  listen(on: RegisterMessages<State>) {
    on(this.message, (state: State, v: Interface) => update(state, v));
  }
  
}

export class Remote<State> {
  public store: StoreInterface<State>;
  private outgoing: OutgoingMessageInterface<State>[];
  private incoming: IncomingMessageInterface<State>[];
  private id: number;
  public connection: Connection;

  constructor(
    initialState: State,
    outgoing: OutgoingMessageInterface<State>[],
    incoming: IncomingMessageInterface<State>[]
  ) {
    this.connection = Connection.getInstance()
    this.id = Connection.uniqueId();
    this.incoming = incoming
    this.outgoing = outgoing
    this.store = Store<State>(initialState, (on: RegisterMessages<State>) => {
      this.outgoing.forEach((outgoing) => outgoing.listen(on, this))
      this.incoming.forEach((incoming) => incoming.listen(on))
    })
    this.incoming.forEach((incoming) => incoming.register(this.id, this.connection, this.store));
  }

  send(name: string, message: string) {
    this.connection.send(this.id, name, message);
  }


}
