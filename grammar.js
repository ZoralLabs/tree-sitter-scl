/**
 * @file SCL (Smart Contracts Language) grammar for tree-sitter
 * @author Tree-sitter SCL Contributors
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
    unary: 6,
    multiplicative: 5,
    additive: 4,
    comparative: 3,
    and: 2,
    or: 1,
};

const multiplicativeOperators = ["*", "/", "%", "<<", ">>", "&", "&^"];
const additiveOperators = ["+", "-", "|", "^"];
const comparativeOperators = ["==", "!=", "<", "<=", ">", ">="];
const assignmentOperators = ["+=", "-=", "*=", "/=", "%=", "&=", "|=", "&^=", "^=", "<<=", ">>="];

module.exports = grammar({
    name: "scl",

    extras: ($) => [
        /\s/, // Whitespace
        $.comment,
    ],

    rules: {
        // The top-level rule representing a whole SCL file
        source_file: ($) => repeat($._statement),

        // Comments
        comment: ($) =>
            token(
                choice(
                    seq("//", /.*/), // Single line comment
                    seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"), // Multi-line comment
                ),
            ),

        // Literals
        true: () => "true",
        false: () => "false",
        undefined: () => "undefined",
        boolean_literal: ($) => choice($.true, $.false),

        // Keywords
        if: () => "if",
        else: () => "else",
        func: () => "func",
        for: () => "for",
        in: () => "in",
        return: () => "return",
        export: () => "export",
        import: () => "import",
        break: () => "break",
        continue: () => "continue",

        // Statements
        _statement: ($) =>
            choice(
                $.variable_declaration,
                $.assignment_statement,
                $.return_statement,
                $.if_statement,
                $.for_statement,
                $.for_in_statement,
                $.export_statement,
                $.break_statement,
                $.continue_statement,
                $.expression_statement,
                $.block,
            ),

        // Variable declarations (identifier := expression)
        variable_declaration: ($) => seq(field("name", $.identifier), ":=", field("value", $._expression)),

        // Assignment statements
        assignment_statement: ($) => seq(field("left", $._expression), field("operator", $.assignment_operator), field("right", $._expression)),

        assignment_operator: ($) =>
            choice(
                "=", // Simple assignment
                ...assignmentOperators, // Compound assignments
            ),

        // Return statement
        return_statement: ($) => prec.right(-1, seq($.return, optional($._expression))),

        // Break and continue statements
        break_statement: ($) => prec.right(-1, seq($.break)),
        continue_statement: ($) => prec.right(-1, seq($.continue)),

        // If statement
        if_statement: ($) =>
            seq(
                $.if,
                field("condition", $._expression),
                field("consequence", $.block),
                optional(choice(seq($.else, field("alternative", $.block)), seq($.else, field("alternative", $.if_statement)))),
            ),

        // For statement (traditional three-part or condition-only)
        for_statement: ($) =>
            choice(
                // for init; condition; update {}
                seq(
                    $.for,
                    field("initialization", optional($._simple_statement)),
                    ";",
                    field("condition", optional($._expression)),
                    ";",
                    field("update", optional($._simple_statement)),
                    field("body", $.block),
                ),
                // for condition {}
                seq($.for, field("condition", $._expression), field("body", $.block)),
                // for {}
                seq($.for, field("body", $.block)),
            ),

        // For-in statement for iteration
        for_in_statement: ($) =>
            seq(
                $.for,
                choice(
                    // for value in iterable {}
                    seq(field("value", $.identifier), $.in, field("iterable", $._expression)),
                    // for key, value in iterable {}
                    seq(field("key", $.identifier), ",", field("value", $.identifier), $.in, field("iterable", $._expression)),
                ),
                field("body", $.block),
            ),

        // Simple statements for for/if initialization
        _simple_statement: ($) => choice($.variable_declaration, $.assignment_statement, $.expression_statement, $.increment_statement, $.decrement_statement),

        // Increment/decrement statements
        increment_statement: ($) => seq(field("expression", $._expression), "++"),
        decrement_statement: ($) => seq(field("expression", $._expression), "--"),

        // Expression statement
        expression_statement: ($) => $._expression,

        // Export statement
        export_statement: ($) => seq($.export, field("value", $._expression)),

        // Expressions
        _expression: ($) =>
            choice(
                $.unary_expression,
                $.binary_expression,
                $.ternary_expression,
                $.function_call,
                $.selector_expression,
                $.index_expression,
                $.slice_expression,
                $.import_expression,
                $.array_literal,
                $.map_literal,
                $.function_literal,
                $.identifier,
                $.parameter_variable,
                $.boolean_literal,
                $.number_literal,
                $.string_literal,
                $.raw_string_literal,
                $.char_literal,
                $.undefined,
                $.parenthesized_expression,
            ),

        // Parenthesized expression
        parenthesized_expression: ($) => seq("(", $._expression, ")"),

        // Ternary conditional expression
        ternary_expression: ($) =>
            prec.right(0, seq(field("condition", $._expression), "?", field("consequence", $._expression), ":", field("alternative", $._expression))),

        // Unary expressions
        unary_expression: ($) => prec(PREC.unary, seq(field("operator", choice("+", "-", "!", "^")), field("operand", $._expression))),

        // Binary expressions
        binary_expression: ($) =>
            choice(
                prec.left(PREC.multiplicative, seq(field("left", $._expression), field("operator", $.multiplicative_operator), field("right", $._expression))),
                prec.left(PREC.additive, seq(field("left", $._expression), field("operator", $.additive_operator), field("right", $._expression))),
                prec.left(PREC.comparative, seq(field("left", $._expression), field("operator", $.comparative_operator), field("right", $._expression))),
                prec.left(PREC.and, seq(field("left", $._expression), field("operator", $.and_operator), field("right", $._expression))),
                prec.left(PREC.or, seq(field("left", $._expression), field("operator", $.or_operator), field("right", $._expression))),
            ),

        multiplicative_operator: ($) => choice(...multiplicativeOperators),
        additive_operator: ($) => choice(...additiveOperators),
        comparative_operator: ($) => choice(...comparativeOperators),
        and_operator: ($) => "&&",
        or_operator: ($) => "||",

        // Array literals
        array_literal: ($) =>
            seq(
                "[",
                optional(
                    seq(
                        $._expression,
                        repeat(seq(",", $._expression)),
                        optional(","), // Allow trailing comma
                    ),
                ),
                "]",
            ),

        // Map literals
        map_literal: ($) =>
            prec(
                1,
                seq(
                    "{",
                    optional(
                        seq(
                            $.map_pair,
                            repeat(seq(",", $.map_pair)),
                            optional(","), // Allow trailing comma
                        ),
                    ),
                    "}",
                ),
            ),

        map_pair: ($) => seq(field("key", $._expression), ":", field("value", $._expression)),

        // Function literals
        function_literal: ($) => seq($.func, field("parameters", $.parameter_list), field("body", $.block)),

        // Parameter list for function definitions
        parameter_list: ($) => seq("(", optional(seq(repeat(seq($.parameter, ",")), choice($.parameter, $.variadic_parameter), optional(","))), ")"),

        parameter: ($) => $.identifier,
        variadic_parameter: ($) => seq("...", $.identifier),

        // Function calls
        function_call: ($) => prec.left(8, seq(field("function", $._expression), field("arguments", $.argument_list))),

        // Import expressions
        import_expression: ($) => prec(8, seq($.import, "(", field("source", choice($.string_literal, $.raw_string_literal)), ")")),

        // Selector expressions (dot notation)
        selector_expression: ($) => prec.left(8, seq(field("object", $._expression), ".", field("property", $.identifier))),

        // Index expressions
        index_expression: ($) => prec.left(8, seq(field("object", $._expression), "[", field("index", $._expression), "]")),

        // Slice expressions
        slice_expression: ($) =>
            prec.left(8, seq(field("object", $._expression), "[", optional(field("start", $._expression)), ":", optional(field("end", $._expression)), "]")),

        // Argument list for function calls
        argument_list: ($) => seq("(", optional(seq($.argument, repeat(seq(",", $.argument)), optional(","))), ")"),

        argument: ($) => choice($._expression, $.spread_argument),
        spread_argument: ($) => seq($._expression, "..."),

        // Code blocks
        block: ($) => seq("{", repeat($._statement), "}"),

        // Lexical tokens
        identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,

        // Parameter variables start with $
        parameter_variable: ($) => /\$[a-zA-Z_][a-zA-Z0-9_]*/,

        // Number literals
        number_literal: ($) => /\d+(\.\d+)?/,

        // String literals
        string_literal: ($) => seq('"', repeat(choice($._escape_sequence, token.immediate(/[^"\\]+/))), '"'),

        // Raw string literals (backticks)
        raw_string_literal: ($) => /`[^`]*`/,

        // Character literals
        char_literal: ($) => seq("'", choice($._escape_sequence, token.immediate(/[^'\\]/)), "'"),

        // Escape sequences
        _escape_sequence: ($) => token(choice(/\\[nrtbfv\\'"a]/, /\\x[0-9a-fA-F]{2}/, /\\u[0-9a-fA-F]{4}/, /\\U[0-9a-fA-F]{8}/, /\\[0-7]{1,3}/)),
    },
});
