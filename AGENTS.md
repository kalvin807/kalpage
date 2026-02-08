# General Rules

## General Direction

- **Paradigm:** Prefer **Pure Functions** and **Dependency Injection**. Isolate side effects.
- **Error Handling:** Fail loud. Prefer `throw` without `catch`. Only catch if transforming the error or strictly recovering. **Never silence errors.**
- **Agentic Hygiene:** If acting as an AI agent, verify your own logic line-by-line. Aggressively prune redundant comments and tests that "mock the mock."

## Code Style

- **Indentation:** Flatten code using **early returns** (`continue`, `return`, `break`) to avoid deep `if/else` nesting.
- **Naming:** Prefix functions with `maybe` if they can return `None`/`null`/`undefined` (e.g., `maybe_get_user` for snake case, `maybeGetUser` for pascal case).
- **Docstrings:** Context is king. Explain _why_ or _how_ (non-trivial info). **Forbidden:** One-liner docstrings that just repeat the function name.
- **Imports:** Always place imports at the **top-level** of the module. Never import inside functions.
- **Boolean Logic:** Use implicit checks (`if obj:`) generally. Explicitly check for `0` or empty strings only if they are valid values. Avoid double negation.

## Plan Style

- **Context First:** Before writing code, verify you have the service layer context. Do not guess database schemas.
- **Scope Definition:** clearly define what is in scope vs. out of scope.
- **Review Prep:** When generating PR descriptions or summaries, include the "Why", the "Scope", and explicitly mention any "Agentic" limitations (e.g., "Tests need human verification").

## Test Style

- **Structure:** Use **standalone functions** (no classes). Keep tests short, focused, and flat.
- **Mocking:** **Avoid mocking** whenever possible. Prefer testing against real helpers, pure logic, or lightweight fakes.
  - If mocking is unavoidable (e.g., 3rd party APIs), use specific tools like `mocker.patch.object` (Python) or `vi.spyOn` (JS), but never mock internal implementation details unnecessarily.
- **Parameterization:** Heavily prefer table-driven tests (`pytest.mark.parametrize` in Python, `test.each` in JS/TS) to deduplicate logic and cover edge cases efficiently.
- **Reusability:** Share fixtures for data setup. Do not duplicate setup logic across multiple tests.
- **Philosophy:** Optimize for high testability by designing pure functions first. Test the output, not the internal state.

---

# TypeScript/JavaScript

## Naming

- **Casing:** `UpperCamelCase` for classes, interfaces, types, enums. `lowerCamelCase` for variables, parameters, functions, methods, properties. `CONSTANT_CASE` for module-level immutable constants and enum values.
- **Descriptive names.** No abbreviations, no Hungarian notation, no leading/trailing underscores. Treat acronyms as words (`loadHttpUrl`, not `loadHTTPURL`).

## Type System

- **Strict TypeScript.** Never use `any`; prefer `unknown` when the type is genuinely unknown. Avoid `{}` type — use `unknown`, `Record<string, T>`, or `object`.
- **Inference:** Rely on type inference for trivially-inferred types. Explicitly annotate complex return types.
- **Interfaces over type aliases** for object shapes. Use `Array<T>` for complex element types, `T[]` for simple ones.
- **Null/Undefined:** Prefer optional fields (`field?`) over `| undefined`. Use `== null` to check for both null and undefined. Never include `| null` or `| undefined` in type aliases.
- **Assertions:** Minimize `as` casts and non-null assertions (`!`). Always add a comment explaining why the assertion is safe. Use `as unknown as T` for double assertions. Prefer runtime checks over assertions.
- **Readonly:** Mark properties that are never reassigned with `readonly`.

## Imports & Exports

- **Named exports only.** No default exports.
- **No mutable exports** (`export let` is forbidden).
- Use `export type` when re-exporting types.
- ES6 module syntax only; never use `require()`.
- Prefer namespace imports (`import * as foo`) for large APIs; named imports for frequently-used symbols.

## Functions

- Prefer **function declarations** for named functions.
- Use **arrow functions** for callbacks and nested functions. Never use `function` expressions (except generators).
- Use rest parameters instead of `arguments`.
- Avoid `this` outside class constructors/methods. Prefer arrow functions over `.bind()`.

## Classes

- Use TypeScript visibility modifiers (`private`, `protected`). Do not use `#` private fields.
- Prefer **parameter properties** over manual constructor assignment.
- Never use `public` modifier except for non-readonly constructor parameter properties.
- No container classes with only static members — use module-level functions instead.
- Getters must be **pure** (no side effects).

## Control Flow

- Always use **braces**, even for single-statement blocks.
- Use `===`/`!==` exclusively. Exception: `== null` for null/undefined checks.
- Use `for...of` for arrays. Prefer `Object.keys()`/`Object.values()`/`Object.entries()` over `for...in`.
- Switch statements must include a `default` case.

## Strings & Literals

- **Single quotes** for ordinary strings. Template literals for interpolation or multi-line.
- Use lowercase prefixes for number literals (`0x`, `0o`, `0b`). No leading zeros.

## Enums

- Use plain `enum` (no `const enum`).
- Never coerce enum values to booleans (`!!`). Compare explicitly: `status !== Status.NONE`.

## Comments

- `/** JSDoc */` for public API documentation. `//` for implementation notes.
- Multi-line comments use multiple `//` lines, not `/* */` blocks.

## Disallowed

- No `var`. Always `const` or `let`. One declaration per statement.
- No wrapper objects (`new String()`, `new Boolean()`, `new Number()`).
- No `eval()`, no `with`, no `debugger` in production.
- No modification of built-in prototypes.

## State Management

- Keep `useEffect` simple. Read "You might not need an effect" guidelines.
- Invalidate React Query caches after mutations.

## Validation

- **Frontend:** Surface Zod errors to the user (UX only).
- **Backend:** Rely on Pydantic for actual security/integrity.

## UI/UX

- Use `visibility` or `opacity` for hiding components with animations (avoid breaking layout).
- Test scrolling behavior on long content.
- Ensure Dark Mode compatibility (no hardcoded hex black/white on text).
