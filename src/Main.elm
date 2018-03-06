module Main exposing (..)

import Html exposing (Html, div, text, program)
import Page.NotFound as NotFound
import Data.Session exposing (Session)


-- MODEL


type Page
    = Blank
    | NotFound
--| Errored PageLoadError
--| Home Home.Model
--| Settings Settings.Model
--| Login Login.Model
--| Register Register.Model
--| Profile Username Profile.Model
--| Article Article.Model
--| Editor (Maybe Slug) Editor.Model


type PageState
    = Loaded Page
    | TransitioningFrom Page


type alias Model =
    { session : Session
    , pageState : PageState
    }


init : ( Model, Cmd Msg )
init =
    ( { session = Session Nothing
      , pageState = Loaded NotFound
      }
    , Cmd.none
    )



-- MESSAGES


type Msg
    = NoOp



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ text "Lakin" ]



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- MAIN


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
