; Increase indent for block contents
(block) @indent

; Increase indent for function body
(function_literal
  body: (block) @indent)

; Increase indent for if statement consequence and alternative
(if_statement
  consequence: (block) @indent)

(if_statement
  alternative: (block) @indent)

; Increase indent for loop bodies
(for_statement
  body: (block) @indent)

(for_in_statement
  body: (block) @indent)

; Increase indent for array literal contents (multi-line)
(array_literal) @indent

; Increase indent for map literal contents (multi-line)
(map_literal) @indent

; Increase indent for function call arguments (multi-line)
(argument_list) @indent

; Increase indent for parameter lists (multi-line)
(parameter_list) @indent

; Align brackets
[
  "{"
  "}"
] @indent.branch

[
  "["
  "]"
] @indent.branch

[
  "("
  ")"
] @indent.branch

; Dedent closing brackets
[
  "}"
  "]"
  ")"
] @indent.dedent


; Begin/end patterns for control structures
(if_statement) @indent.begin
(for_statement) @indent.begin
(for_in_statement) @indent.begin
(function_literal) @indent.begin
