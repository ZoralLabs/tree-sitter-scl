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
(parameter_variable) @variable.parameter

; Booleans
(boolean_literal) @constant.builtin.boolean

; Undefined
(undefined) @constant.builtin

; Numbers
(number_literal) @number

; Import
(import_expression (import) @function.builtin.import)

; Keywords
(if_statement (if) @keyword.control.conditional)
(if_statement (else) @keyword.control.conditional)
(for_statement (for) @keyword.control.loop)
(for_in_statement (for) @keyword.control.loop)
(for_in_statement (in) @keyword.control.loop)
(return_statement (return) @keyword.control.jump)
(break_statement (break) @keyword.control.jump)
(continue_statement (continue) @keyword.control.jump)
(export_statement (export) @keyword.declaration)
(function_literal (func) @keyword.declaration)

; Generic function call
(function_call function: (identifier) @function)

; Builtin functions
(function_call function: (identifier) @function.builtin
    (#match? @function.builtin "^(len|copy|append|delete|splice|format|range|assert|assert2|min|max|parse_bool|type_name|is_int|is_float|is_string|is_bool|is_char|is_bytes|is_array|is_immutable_array|is_map|is_immutable_map|is_iterable|is_time|is_error|is_undefined|is_function|is_callable|is_decimal|is_uid|is_balance_id|is_balance|is_posting|is_transaction|is_tiered_rate|is_dated_rate|is_nid|is_op_context)$"))

; Builtin contract functions
(function_call function: (identifier) @function.builtin.contract
    (#match? @function.builtin.contract "^(log|reject|deactivate|new_transaction|new_posting|new_notification|new_snapshot|enable_events|disable_events|set_parameter|schedule_event|to_event_time)$"))

; Builtin type functions
(function_call function: (identifier) @type.builtin
    (#match? @type.builtin "^(string|int|bool|float|char|bytes|time|decimal|uid|tiered_rate|dated_rate)$"))

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
(map_pair key: (boolean_literal) @property.boolean)
(map_pair key: (undefined) @property.keyword)
