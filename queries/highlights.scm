; Keywords
[
  "if"
  "else"
  "for"
  "in"
  "func"
  "return"
  "import"
  "export"
  "var"
  "break"
  "continue"
] @keyword

; Built-in SCL functions
[
  "reject"
  "set_parameter"
  "schedule_event"
  "new_transaction"
  "new_posting"
  "deactivate"
  "min"
  "max"
] @function.builtin

; Boolean literals
[
  "true"
  "false"
  "undefined"
] @constant.builtin

; Comments
(comment) @comment

; Identifiers
(identifier) @variable

; Parameter variables (prefixed with $)
(parameter_variable) @variable.parameter

; Function definitions and calls
(function_literal
  parameters: (parameter_list) @parameter)

(function_call
  function: (identifier) @function)

(function_call
  function: (selector_expression
    property: (identifier) @function.method))

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "<<"
  ">>"
  "&"
  "&^"
  "|"
  "^"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
] @operator

; Assignment operators
[
  "="
  ":="
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "&^="
  "^="
  "<<="
  ">>="
] @operator.assignment

; Punctuation
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ";"
  ":"
  "."
] @punctuation.delimiter

; Literals
(number_literal) @number

(string_literal) @string
(raw_string_literal) @string
(char_literal) @string

; Control flow
(if_statement) @conditional
(for_statement) @repeat
(for_in_statement) @repeat

(return_statement) @keyword.return
(break_statement) @keyword.control
(continue_statement) @keyword.control

; Import/Export
(import_expression) @keyword.import
(export_statement) @keyword.export

; Property access
(selector_expression
  property: (identifier) @property)

; Array and map access
(index_expression) @operator

; Map keys in literals
(map_pair
  key: (_) @property)

; Function parameters
(parameter) @parameter
(variadic_parameter) @parameter

; Special highlighting for error/reject calls
(function_call
  function: (identifier) @function.builtin.error
  (#eq? @function.builtin.error "reject"))

; Special highlighting for parameter setting
(function_call
  function: (identifier) @function.builtin.config
  (#eq? @function.builtin.config "set_parameter"))

; Module names in imports
(import_expression
  source: (string_literal) @string.special)

; Increment/decrement
(increment_statement) @operator
(decrement_statement) @operator
