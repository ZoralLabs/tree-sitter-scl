; Scopes
(block) @local.scope
(function_literal) @local.scope
(for_statement) @local.scope
(for_in_statement) @local.scope
(source_file) @local.scope

; Variable definitions
(variable_declaration
  name: (identifier) @local.definition.variable)

; Parameter definitions in function literals
(function_literal
  parameters: (parameter_list
    (parameter (identifier) @local.definition.parameter)))

; Variadic parameter definitions
(function_literal
  parameters: (parameter_list
    (variadic_parameter (identifier) @local.definition.parameter)))

; For loop variable definitions
(for_statement
  initialization: (variable_declaration
    name: (identifier) @local.definition.variable))

; For-in loop variable definitions
(for_in_statement
  key: (identifier) @local.definition.variable)

(for_in_statement
  value: (identifier) @local.definition.variable)

; Variable references
(identifier) @local.reference

; Parameter variable references (starting with $)
(parameter_variable) @local.reference

; Function references in function calls
(function_call
  function: (identifier) @local.reference)

; Property access - object reference
(selector_expression
  object: (identifier) @local.reference)

; Index expression - object reference
(index_expression
  object: (identifier) @local.reference)

; Slice expression - object reference
(slice_expression
  object: (identifier) @local.reference)

; Assignment targets
(assignment_statement
  left: (identifier) @local.reference)
