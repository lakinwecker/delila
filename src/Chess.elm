
type PieceColor = White | Black
type PieceType = Pawn | Knight | Bishop | Rook | King | Queen
type Piece = Piece PieceColor PieceType
type Rank = Rank_1 | Rank_2 | Rank_3 | Rank_4 | Rank_5 | Rank_6 | Rank_7 | Rank_8
type File = File_A | File_B | File_C | File_D | File_E | File_F | File_G | File_H
type Square = Square File Rank
type FEN = FEN String
type PGN = PGN String
