module Data.Session exposing (Session)
import Data.Server exposing (Server)

type alias Session =
    { server : Maybe Server }

