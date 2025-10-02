export interface SyntaxNode {
  type: string;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  parent: SyntaxNode | null;
  children: Array<SyntaxNode>;
  namedChildren: Array<SyntaxNode>;
  childCount: number;
  namedChildCount: number;
  firstChild: SyntaxNode | null;
  firstNamedChild: SyntaxNode | null;
  lastChild: SyntaxNode | null;
  lastNamedChild: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  nextNamedSibling: SyntaxNode | null;
  previousSibling: SyntaxNode | null;
  previousNamedSibling: SyntaxNode | null;
  hasChanges(): boolean;
  hasError(): boolean;
  isError(): boolean;
  isMissing(): boolean;
  toString(): string;
  child(index: number): SyntaxNode | null;
  namedChild(index: number): SyntaxNode | null;
  childForFieldName(fieldName: string): SyntaxNode | null;
  childForFieldId(fieldId: number): SyntaxNode | null;
  fieldNameForChild(childIndex: number): string | null;
  childrenForFieldName(fieldName: string): Array<SyntaxNode>;
  childrenForFieldId(fieldId: number): Array<SyntaxNode>;
  descendantForIndex(index: number): SyntaxNode;
  descendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  namedDescendantForIndex(index: number): SyntaxNode;
  namedDescendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  descendantForPosition(position: Point): SyntaxNode;
  descendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  namedDescendantForPosition(position: Point): SyntaxNode;
  namedDescendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  walk(): TreeCursor;
}

export interface TreeCursor {
  nodeType: string;
  nodeText: string;
  nodeIsNamed: boolean;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  readonly currentNode: SyntaxNode;
  reset(node: SyntaxNode): void;
  gotoParent(): boolean;
  gotoFirstChild(): boolean;
  gotoFirstChildForIndex(index: number): boolean;
  gotoNextSibling(): boolean;
}

export interface Point {
  row: number;
  column: number;
}

export interface Range {
  startIndex: number;
  endIndex: number;
  startPosition: Point;
  endPosition: Point;
}

export interface Edit {
  startIndex: number;
  oldEndIndex: number;
  newEndIndex: number;
  startPosition: Point;
  oldEndPosition: Point;
  newEndPosition: Point;
}

export interface Logger {
  log(message: string): void;
}

export class Language {
  static load(path: string): Language;
  readonly version: number;
  readonly fieldCount: number;
  readonly nodeTypeCount: number;
  fieldIdForName(fieldName: string): number | null;
  fieldNameForId(fieldId: number): string | null;
  idForNodeType(type: string, named: boolean): number;
  nodeTypeForId(typeId: number): string | null;
  nodeTypeIsNamed(typeId: number): boolean;
  nodeTypeIsVisible(typeId: number): boolean;
  query(source: string): Query;
}

export class Query {
  readonly captureNames: Array<string>;
  readonly matchLimit: number;
  readonly patternCount: number;
  readonly timeoutMicros: number;
  matches(
    node: SyntaxNode,
    startPosition?: Point,
    endPosition?: Point
  ): Array<QueryMatch>;
  captures(
    node: SyntaxNode,
    startPosition?: Point,
    endPosition?: Point
  ): Array<QueryCapture>;
}

export interface QueryCapture {
  name: string;
  node: SyntaxNode;
}

export interface QueryMatch {
  pattern: number;
  captures: Array<QueryCapture>;
}

export interface QueryOptions {
  startPosition?: Point;
  endPosition?: Point;
  startIndex?: number;
  endIndex?: number;
  matchLimit?: number;
  maxStartDepth?: number;
  timeoutMicros?: number;
}

export class Tree {
  readonly rootNode: SyntaxNode;
  readonly language: Language;
  copy(): Tree;
  delete(): void;
  edit(edit: Edit): Tree;
  walk(): TreeCursor;
  getChangedRanges(other: Tree): Array<Range>;
  getIncludedRanges(): Array<Range>;
  getEditedRange(other: Tree): Range;
}

export class Parser {
  delete(): void;
  parse(input: string | Input, tree?: Tree): Tree | null;
  parseTextBuffer(buffer: TextBuffer, tree?: Tree): Tree | null;
  parseTextBufferSync(buffer: TextBuffer, tree?: Tree): Tree | null;
  reset(): void;
  setTimeoutMicros(timeout: number): void;
  getTimeoutMicros(): number;
  setIncludedRanges(ranges: Array<Range>): void;
  getIncludedRanges(): Array<Range>;
  getLanguage(): Language | null;
  setLanguage(language: Language | null): void;
  getLogger(): Logger | null;
  setLogger(logFunc: Logger | null): void;
}

export type Input = (
  index: number,
  position?: Point
) => string | null;

export interface TextBuffer {
  [index: number]: Array<string> | string;
  length: number;
}

declare const language: Language;
export = language;
