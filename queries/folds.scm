; Fold blocks
(block) @fold

; Fold function literals
(function_literal
  body: (block) @fold)

; Fold if statements
(if_statement
  consequence: (block) @fold
  alternative: (block)? @fold)

; Fold for statements
(for_statement
  body: (block) @fold)

; Fold for-in statements
(for_in_statement
  body: (block) @fold)

; Fold array literals (when they span multiple lines)
(array_literal) @fold

; Fold map literals
(map_literal) @fold

; Fold multi-line comments
(comment) @fold
