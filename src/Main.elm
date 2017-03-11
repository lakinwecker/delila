module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Color
import Utils
import FontAwesome as FA
-- import Read


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model
type Page = Splash | Read

type alias Model =
    { page : Page }


init : ( Model, Cmd Msg )
init =
    Model Read ! []


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
    case model.page of 
        Read -> 
            section [ ]
                [ header [ ]
                    [ nav [ ]
                        [ a [ class "burger" ] [ FA.bars Color.black 32 ] ]
                    , h1 [ class "breadcrumbs" ]
                        [ text("Delila") ]
                    , div [ class "search" ]
                        [
                            input [ type_ "text", name "search", placeholder "Search ..." ] [ ]
                        ]
                    ]
                , section [ ]
                    [ h1 []
                        [ text ("Hello Read") ]
                    , div [ class "read" ]
                        [ text ("A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. A bunch of text over and over and over. ") ]
                    ]
                ]
        Splash -> 
            h1 []
                [ text ("Hello Splash") ]


-- Subscriptions

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
