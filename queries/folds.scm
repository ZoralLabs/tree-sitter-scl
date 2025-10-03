; Fold blocks
(block) @fold

; Fold function bodies
(function_literal
  body: (block) @fold)

; Fold array literals (when they span multiple lines)
(array_literal) @fold

; Fold map literals (when they span multiple lines)
(map_literal) @fold

; Fold multi-line comments
(comment) @fold

; Fold if statement blocks
(if_statement
  consequence: (block) @fold)

(if_statement
  alternative: (block) @fold)

; Fold for loop bodies
(for_statement
  body: (block) @fold)

(for_in_statement
  body: (block) @fold)

; Fold function call arguments when they span multiple lines
(argument_list) @fold

; Fold parameter lists when they span multiple lines
(parameter_list) @fold
