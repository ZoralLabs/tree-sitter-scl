; Variable definitions
(variable_declaration
  name: (identifier) @local.definition)

; Function parameters are local definitions
(parameter (identifier) @local.definition)
(variadic_parameter (identifier) @local.definition)

; Function definitions
(function_literal) @local.scope

; Block statements create new scopes
(block) @local.scope

; For loop variables
(for_in_statement
  key: (identifier)? @local.definition
  value: (identifier) @local.definition
  body: (block) @local.scope)

; Variable references
(identifier) @local.reference

; Parameter variable references (these are global contract parameters, not local)
(parameter_variable) @global.reference

; Import creates a local binding
(variable_declaration
  name: (identifier) @local.definition
  value: (import_expression))

; Function calls don't create references to the function name
; unless it's a simple identifier
(function_call
  function: (identifier) @local.reference)

; Property access doesn't create a reference to the property name
; but the object might be a local reference
(selector_expression
  object: (identifier) @local.reference)

; Index access - the object might be a local reference
(index_expression
  object: (identifier) @local.reference)

; Assignment targets
(assignment_statement
  left: (identifier) @local.reference)
