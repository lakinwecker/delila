# Delila

This is a project with many goals. I may never get them all, but I'm sure going to try.

## Goals

1. Completely Replace the need for Chessabse, SCID, Chessable, Chess position trainer and Chesstempo.
2. Build a better chess engine designed to aid in learning.
    - Should be faster than stockfish at finding and identifying teachable positions (tactical puzzles, positional motifs)
    - elo is a secondary goal
    - Must be able to identify motifs
3. Get much (most?) of it integrated into lichess directly.

## Features
1. e-book reader. PDF, PGN, Chessbase files. Optimized for desktop and tablets/phones.
    1. Extensive markup of positions with arrows, circles, notes, comments, etc. Stored permanently.
    2. Ability to easily switch to other reference material that you have that covers simlar positions.
2. database creation and maintenance.
    1. Opening repertoire features.
        1. Spaced repetition for practice of opening repertoire databases
        2. Automatic analysis of holes: Often or rare lines or computer moves that you don't cover that are legitmate alternatives.
        3. Easy ability to add lines from books into your repertoire
        4. Practice of entire lines, not just individual positions.
        5. When mistakes are made, immediate recall of book line w/ personal notes etc.
        6. When lines are successfully completed ability to transition into a guess-the-move from a master's game that reached the same position or to play on against the computer or to transition into tactics that arose out of this line.
        7. Ability to compare your own games against your opening repertoire to compare when and where you went wrong.
    2. Sort by PGN tags (White pLayer, Elo, Black player, date, multiple sorts)
    3. Merge/manipulate databases.
    4. Filter/searching of games similar to scoutfish (use scoutfish???)
3. tactic generation
    1. Tactics based on motifs
    2. Tactics from specific game sets (your own, master's etc).
    3. Motif and depth-of-calculation-motif rating. Example: found a winning line, but not the mate in 3? Lose rating for th "type of mate in 3" that you missed, but gain rating for the motif that you took advantage of to achieve a winning position.
    4. Spaced repitition training on tactical-motifs based on your rating/ability.
    5. Custom engine to more quickly and easily identify and share tactics from positions.

## Architecture.

The view / controller will use http://nwjs.io/ + mithril.js + chessground for the interface. 
The model will be powered by a Rust backend in order to make proper use of today's concurrent CPUs. 
Communication between view/controller and model will be over HTTP (yes, even locally). Why?
Because it's a great way to enforce proper model separation, and it allows full separation of the view from the engine, even across system boundaries.
Also, it will allos us to integrate the JS stuff into lichess and possibly a deployment the RUST server as a service for lichess should any of these features be desired in lichess.

## What if lichess replicates or otherwise provides these same features?

Great!  That's where many of these features belong. I still see the need for an offline version of these features due to licensing issues with importing e-books into lichess proper and the desire to have all of your data backed up locally for convenience and ease of use and to protect against the risk of lichess losing it.
