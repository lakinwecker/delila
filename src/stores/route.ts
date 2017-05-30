import { Message } from 'kaiju'
import Store from 'kaiju/store'
import { update } from 'immupdate'

//-----------------------------------------------------------------------------------------
export const navigate = Message<Route>('navigate')

//-----------------------------------------------------------------------------------------
export enum Route {
  Splash,
  Reader,
  Dashboard
}

//-----------------------------------------------------------------------------------------
interface RouteState {
  route: Route
}

//-----------------------------------------------------------------------------------------
const initialState = { route: Route.Splash }

//-----------------------------------------------------------------------------------------
export default Store<RouteState>(initialState, on => {
  on(navigate, (state, route) =>
    update(state, { route: route })
  )
})

