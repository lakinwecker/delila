module Route exposing (Route(..), fromLocation, href, modifyUrl)

-- import Data.Article as Article
-- import Data.User as User exposing (Username)
import Html exposing (Attribute)
import Html.Attributes as Attr
import Navigation exposing (Location)
import UrlParser as Url exposing ((</>), Parser, oneOf, parseHash, s, string)


-- ROUTING --

type Route
    = Home
    | Search
    | Settings
    -- | Pile Pile.Slug
    -- | Repertoire Repertoire.Slug
    -- | Game Game.Slug
    -- | Puzzle Puzzle.Slug
    -- | Book Book.Slug


route : Parser (Route -> a) a
route =
    oneOf
        [ Url.map Home (s "")
        , Url.map Search (s "search")
        , Url.map Settings (s "settings")
        --, Url.map Logout (s "logout")
        --, Url.map Repe (s "settings")
        --, Url.map Profile (s "profile" </> User.usernameParser)
        --, Url.map Register (s "register")
        --, Url.map Article (s "article" </> Article.slugParser)
        --, Url.map NewArticle (s "editor")
        --, Url.map EditArticle (s "editor" </> Article.slugParser)
        ]



-- INTERNAL --


routeToString : Route -> String
routeToString page =
    let
        pieces =
            case page of
                Home ->
                    []

                Search ->
                    [ "search" ]

                --Logout ->
                    --[ "logout" ]

                --Register ->
                    --[ "register" ]

                Settings ->
                    [ "settings" ]

                --Article slug ->
                    --[ "article", Article.slugToString slug ]

                --Profile username ->
                    --[ "profile", User.usernameToString username ]

                --NewArticle ->
                    --[ "editor" ]

                --EditArticle slug ->
                    --[ "editor", Article.slugToString slug ]
    in
    "#/" ++ String.join "/" pieces



-- PUBLIC HELPERS --


href : Route -> Attribute msg
href route =
    Attr.href (routeToString route)


modifyUrl : Route -> Cmd msg
modifyUrl =
    routeToString >> Navigation.modifyUrl


fromLocation : Location -> Maybe Route
fromLocation location =
    if String.isEmpty location.hash then
        Just Home
    else
        parseHash route location
