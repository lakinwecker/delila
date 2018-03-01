import { Store, Message } from 'kaiju'
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
export default Store<RouteState>(initialState, ({on, state}) => {
  on(navigate, route =>
    update(state(), { route: route })
  )
})

