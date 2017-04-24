// A remote task is something you execute and then get a set of responses to.
//
// Each execution is simply sending a websocket message.
//
// Each remote message received is updating the state of the object. Eezy-peezy
import { Message } from 'kaiju'
import { update } from 'immupdate'
import { Store as StoreInterface, RegisterMessages } from 'kaiju/store'
import Store from 'kaiju/store'

import { Connection } from './connection'

// TODO: at some point we want this to be as type safe as possible. We can't quite
//       achieve that yet - but I want it to work like rocket.

//--------------------------------------------------------------------------------------------------
export abstract class OutgoingBase<State> {
  abstract listen(on: RegisterMessages<State>): void;
}

//--------------------------------------------------------------------------------------------------
export class Outgoing<State, Interface> extends OutgoingBase<State> {
  private message: Message<Interface>;

  constructor(message: Message<Interface>) {
    super()
    this.message = message
  }

  listen(on: RegisterMessages<State>) {
    on(this.message, (state: State, v: Interface) => {
      return update(state, v);
    })
  }
}

//--------------------------------------------------------------------------------------------------
export abstract class IncomingBase<State> {
  abstract register(id: number, connection: Connection, store: StoreInterface<State>): void;
}

//--------------------------------------------------------------------------------------------------
export class Incoming<State, Interface> extends IncomingBase<State> {
  private message: Message<Interface>;

  constructor(message: Message<Interface>) {
    super()
    this.message = message
  }

  register(id: number, connection: Connection, store: StoreInterface<State>) {
    connection.register(id, this.message.name, jsonString => {
      console.log("Received: " + this.message.name + " -- " + jsonString)
      // TODO: Do some type based conversion/checking and then dispatch the message.
      store.send(this.message(JSON.parse(jsonString) as Interface));
    })
  }
}

//--------------------------------------------------------------------------------------------------
export class Remote<State> {
  private store: StoreInterface<State>;
  private outgoing: OutgoingBase<State>[];
  private incoming: IncomingBase<State>[];
  private connection: Connection;
  private id: number;

  //------------------------------------------------------------------------------------------------
  constructor(
    initialState: State,
    outgoing: OutgoingBase<State>[],
    incoming: IncomingBase<State>[]
  ) {
    this.connection = Connection.getInstance()
    this.id = Connection.uniqueId();
    this.incoming = incoming
    this.outgoing = outgoing
    this.store = Store<State>(initialState, (on: RegisterMessages<State>) => {
      this.outgoing.forEach((outgoing) => outgoing.listen(on))
    })
    this.incoming.forEach((incoming) => incoming.register(this.id, this.connection, this.store));
  }

}
