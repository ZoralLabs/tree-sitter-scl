; Comments
(comment) @comment

; Punctuation
[":"
 ","
 ";"
 "."] @punctuation.delimiter

; Brackets
["{"
 "}"
 "["
 "]"
 "("
 ")"] @punctuation.bracket

; Operators
["="
 ":="
 "=="
 "!"
 "!="
 "+"
 "++"
 "+="
 "-"
 "--"
 "-="
 "*"
 "*="
 "/"
 "/="
 "%"
 "%="
 "^"
 "^="
 "&"
 (and_operator)
 "&="
 "|"
 (or_operator)
 "|="
 "<"
 "<="
 "<<"
 "<<="
 ">"
 ">="
 ">>"
 ">>="
 "&^"
 "&^="
 "?"] @operator

; Generic variable
(identifier) @variable

; Parameter variables
(parameter_variable) @variable.special

; Booleans
(boolean_literal) @boolean

; Undefined
(undefined) @constant.builtin

; Numbers
(number_literal) @number

; Import
(import_expression (import) @function.builtin)
(variable_declaration
    name: (identifier) @module
    value: (import_expression (import) @function.builtin))

; Keywords
(if_statement (if) @keyword)
(if_statement (else) @keyword)
(for_statement (for) @keyword)
(for_in_statement (for) @keyword)
(for_in_statement (in) @keyword)
(return_statement (return) @keyword)
(break_statement (break) @keyword)
(continue_statement (continue) @keyword)
(export_statement (export) @keyword.special)
(function_literal (func) @keyword)

; Function definitions
(variable_declaration
    name: (identifier) @function
    value: (function_literal (func) @keyword.special))

; Generic function call
(function_call function: (identifier) @function)

; Builtin functions
(function_call function: (identifier) @function.builtin
    (#match? @function.builtin "^(len|copy|append|delete|splice|format|range|assert|assert2|min|max|parse_bool|type_name|is_int|is_float|is_string|is_bool|is_char|is_bytes|is_array|is_immutable_array|is_map|is_immutable_map|is_iterable|is_time|is_error|is_undefined|is_function|is_callable|is_decimal|is_uid|is_balance_id|is_balance|is_posting|is_transaction|is_tiered_rate|is_dated_rate|is_nid|is_op_context)$"))

; Builtin contract functions
(function_call function: (identifier) @function.special
    (#match? @function.special "^(log|reject|deactivate|new_transaction|new_posting|new_notification|new_snapshot|enable_events|disable_events|set_parameter|schedule_event|to_event_time)$"))

; Builtin type functions
(function_call function: (identifier) @type
    (#match? @type "^(string|int|bool|float|char|bytes|time|decimal|uid|tiered_rate|dated_rate)$"))

; Generic selector
(selector_expression
    object: (identifier) @module
    property: (identifier) @property)

; Function call with selector
(function_call function: (selector_expression
    object: (identifier) @module
    property: (identifier) @function))

; Strings
(string_literal) @string

; Map keys
(map_pair key: (identifier) @property)
(map_pair key: (string_literal) @property.string)
(map_pair key: (number_literal) @property.number)
(map_pair key: (boolean_literal) @property)
(map_pair key: (undefined) @property)
