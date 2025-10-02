# tree-sitter-scl

A [Tree-sitter](https://tree-sitter.github.io/tree-sitter/) grammar for SCL (Smart Contracts Language), a programming language based on Tengo and Go for writing smart contracts.

## Overview

SCL is a smart contracts language that provides built-in functions and constructs for financial and contract operations. This tree-sitter grammar enables syntax highlighting, code folding, and other editor features for SCL files in various editors including Zed, Neovim, Helix, and others.

## Features

- **Complete SCL syntax support**: Variables, functions, control structures, operators
- **Smart contracts built-ins**: `reject()`, `set_parameter()`, `schedule_event()`, `new_transaction()`, `new_posting()`, etc.
- **Parameter variables**: Support for `$` prefixed variables (e.g., `$loan_amount`, `$effective_time`)
- **Import system**: Module imports with `import("module_name")`
- **Go-like syntax**: Control structures, operators, and expressions similar to Go/Tengo
- **Comments**: Both single-line (`//`) and multi-line (`/* */`) comments

## Installation

### For Zed Editor

This grammar is designed to work with the Zed SCL extension (separate repository). The extension will automatically use this parser.

### Manual Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/tree-sitter-scl.git
cd tree-sitter-scl
```

2. Generate the parser:

```bash
npm install
npm run generate
```

3. Build the parser:

```bash
npm run build
```

### For Neovim

Add to your Neovim configuration:

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.scl = {
  install_info = {
    url = "https://github.com/yourusername/tree-sitter-scl",
    files = {"src/parser.c"},
    branch = "main",
  },
  filetype = "scl",
}
```

## Language Examples

### Variable Declarations and Assignments

```scl
// Variable declaration with :=
fin := import("fin")
times := import("times")

// Parameter variables (prefixed with $)
amount := $loan_amount
rate := $interest_rate

// Assignments
rate = fin.get_dated_rate($fixed_base_interest_rate, $effective_time, $max_interest_rate)
```

### Control Structures

```scl
// If statements
if $loan_amount <= 0 {
    reject("Loan amount must be positive: " + $loan_amount)
}

// For loops
for i := 0; i < 10; i++ {
    // loop body
}

// For-in loops
for key, value in some_map {
    // iterate over map
}
```

### Smart Contract Built-ins

```scl
// Contract operations
set_parameter("loan_interest_rate", rate)
schedule_event("booking", booking_time)
new_transaction($disbursement_transaction_type, "Loan disbursement")
new_posting($primary_balance_id, $loan_disbursement_balance_id, $loan_amount, $ledger, $disbursement_posting_type)

// Validation and control
reject("Invalid loan amount")
deactivate()
```

### Functions and Expressions

```scl
// Function calls
emi_amount := fin.payment(base_rate, $loan_period, $loan_amount, 0, "pay_end")
booking_time := min(booking_time, installment_demand_time)

// Array and map access
balance_amount := balances["primary"].amount
first_item := array[0]
slice_result := array[1:5]
```

## Grammar Structure

The grammar supports:

- **Statements**: Variable declarations, assignments, control flow, expressions
- **Expressions**: Binary/unary operations, function calls, literals, parameter variables
- **Literals**: Numbers, strings (quoted and raw), booleans, arrays, maps
- **Built-in functions**: Smart contract specific functions like `reject`, `set_parameter`
- **Operators**: Arithmetic (`+`, `-`, `*`, `/`), comparison (`==`, `!=`, `<`, `>`), logical (`&&`, `||`)
- **Comments**: Single-line (`//`) and multi-line (`/* */`)

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [tree-sitter-cli](https://github.com/tree-sitter/tree-sitter/tree/master/cli)

### Building

```bash
# Install dependencies
npm install

# Generate parser from grammar
npm run generate

# Build native parser
npm run build

# Build WASM parser (for web)
npm run build-wasm
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode for development
npm run test-watch

# Parse specific files
npm run parse examples/test.scl
```

### Adding Test Cases

Add test cases in the `test/corpus/` directory. Each test file should follow the tree-sitter test format:

```
================================================================================
Test name
================================================================================

code to parse

--------------------------------------------------------------------------------

(expected_parse_tree)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Language Reference

SCL is based on the Tengo language, which is inspired by Go. Key differences:

- **Parameter variables**: Variables prefixed with `$` represent contract parameters
- **Built-in smart contract functions**: Functions for contract lifecycle management
- **Simplified type system**: Dynamic typing similar to Tengo
- **Financial operations**: Built-in support for monetary calculations and transactions

## Related Projects

- [tree-sitter-tengo](https://github.com/ami-/tree-sitter-tengo) - Tree-sitter grammar for Tengo language
- [tree-sitter-go](https://github.com/tree-sitter/tree-sitter-go) - Tree-sitter grammar for Go language
- [SCL Zed Extension](https://github.com/yourusername/zed-scl) - Zed editor extension for SCL

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Based on the Tengo language tree-sitter grammar by [ami-](https://github.com/ami-/tree-sitter-tengo)
- Inspired by the Go language tree-sitter grammar
- Tree-sitter framework by [Max Brunsfeld](https://github.com/maxbrunsfeld)
