module Read exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Utils




-- Model

type alias Model =
    { name : String }


init : ( Model, Cmd Msg )
init =
    Model "Read" ! []



-- Update


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            model ! []



-- View


view : Model -> Html Msg
view model =
    h1 []
        [ text ("Hello " ++ (Utils.capitalize model.name)) ]


-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
