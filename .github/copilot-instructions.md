# Copilot Instructions for to-keypath

## Repository Summary

This is a small, focused TypeScript/JavaScript utility library that converts an array of object keys into a keypath string (e.g., `['a', 'b', 'c']` → `'a.b.c'`). The repository contains only two main source files and uses a comprehensive CI/CD pipeline with multiple quality checks.

**Key Facts:**

- Single utility function `toKeypath` exported from `src/index.ts`
- Dual ESM/CJS package distribution using `tshy`
- TypeScript codebase with Node.js built-in test runner
- Extensive linting and quality checks
- Node.js 18.19.0+ required (22.18.0 recommended per `.nvmrc`)
- Very small codebase - make minimal, surgical changes only

## Build and Development Commands

**ALWAYS run commands in this exact order for reliable results:**

### 1. Bootstrap (Required First)

```bash
npm install
```

- Installs dependencies and runs husky prepare
- Must be run before any other commands

### 2. Build (Required Before Linting)

```bash
npm run build
```

- Uses `tshy` to generate dual ESM/CJS packages in `dist/`
- **Always run before linting** - some lint rules check built files
- Outputs to `dist/commonjs/` and `dist/esm/`
- Build time: ~5-10 seconds

### 3. Type Checking

```bash
npm run tsc
```

- Runs TypeScript compiler without emitting files
- Uses `tsconfig.tsc.json` configuration
- Must pass before linting will work properly

### 4. Testing

```bash
npm test
```

- Uses Node.js built-in test runner with `tsx` for TypeScript support
- Runs `test/index.spec.ts` with comprehensive test coverage
- Test time: ~1-2 seconds
- All tests must pass for CI to succeed

### 5. Linting (All Must Pass)

Run **all** of these lint commands - CI checks each separately:

```bash
npm run lint          # ESLint with TypeScript rules
npm run lint:format   # Prettier formatting check
npm run lint:knip     # Unused dependencies/code detection
npm run lint:md       # Markdown linting
npm run lint:spelling # CSpell spelling check
```

**Critical:** Run `npm run build` before linting or some rules will fail.

### 6. Format Code (Auto-fix)

```bash
npm run format        # Auto-format with Prettier
npm run lint -- --fix # Auto-fix ESLint issues
```

## Project Architecture

### Source Structure

```text
src/
├── index.ts                # Main module with toKeypath function
test/
├── index.spec.ts          # Comprehensive test suite
dist/                      # Generated build output (gitignored)
├── commonjs/              # CommonJS build
└── esm/                   # ESM build
```

### Key Configuration Files

- `package.json` - Scripts, dependencies, tshy config, lint-staged rules
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint with TypeScript, stylistic, and perfectionist rules
- `cspell.json` - Spell checking configuration and custom words
- `.nvmrc` - Node.js version 22.18.0
- `.wallaby.js` - Wallaby.js test runner config

### Build System

- **tshy**: Generates dual ESM/CJS packages from single TypeScript source
- **Configuration**: `package.json` "tshy" section defines exports
- **Output**: Creates both `dist/commonjs/` and `dist/esm/` with type definitions

## Continuous Integration

The repository runs **12 separate CI workflows** that all must pass:

### Core Workflows

- **test.yml**: Tests on Node.js 20,22 × ubuntu/windows matrix
- **build.yml**: Verifies `npm run build` succeeds
- **tsc.yml**: TypeScript compilation check

### Lint Workflows (All Required)

- **lint.yml**: Main ESLint check
- **lint-format.yml**: Prettier formatting
- **lint-knip.yml**: Unused code detection
- **lint-markdown.yml**: Markdown quality
- **lint-spelling.yml**: Spell checking

### Other Workflows

- **lint-commit.yml**: Conventional commit format
- **release.yml**: Automated releases
- **accessibility-alt-text-bot.yml**: Accessibility checks

**Critical:** All workflows must pass. Run all lint commands locally before pushing.

## Common Issues and Workarounds

### Build Failures

- **Error**: "Cannot find module" during build
- **Fix**: Run `npm install` first, then `npm run build`

### Lint Failures

- **Error**: ESLint rules failing on missing built files
- **Fix**: Always run `npm run build` before `npm run lint`

### Type Errors

- **Error**: TypeScript compilation errors
- **Fix**: Run `npm run tsc` to see detailed type errors
- Check `tsconfig.json` for strict type checking rules

### Test Failures

- **Error**: Import resolution issues in tests
- **Fix**: Tests use Node.js test runner with `tsx` - ensure TypeScript builds correctly first

### Spelling Failures

- **Error**: CSpell finding unknown words
- **Fix**: Add legitimate words to `cspell.json` "words" array
- Common project words already included: "boneskull", "keypath", "tshy", etc.

## Development Workflow

### For Code Changes:

1. `npm install` (if first time or dependencies changed)
2. `npm run build`
3. `npm run tsc` (check types)
4. `npm test` (verify tests pass)
5. Make your changes to `src/index.ts` or `test/index.spec.ts`
6. `npm run build` (rebuild after changes)
7. `npm test` (verify tests still pass)
8. Run all lint commands to verify CI will pass
9. `npm run format` (auto-format if needed)

### For Documentation Changes:

1. Edit Markdown files
2. `npm run lint:md` (check Markdown format)
3. `npm run lint:spelling` (check spelling)
4. `npm run format` (auto-format)

## Testing Strategy

- **Framework**: Node.js built-in test runner (no external test framework)
- **TypeScript Support**: Uses `tsx` for runtime TypeScript execution
- **Test File**: `test/index.spec.ts` - comprehensive test coverage
- **Structure**: Nested `describe`/`it` blocks testing all edge cases
- **Assertions**: Node.js `assert/strict` module

### Test Categories Covered:

- Integer-like keys (bracket notation)
- Invalid integer strings (quoted)
- Special characters requiring brackets
- Dot notation for valid identifiers
- Quoted key unwrapping
- Empty path handling
- Reserved keywords (allowed in dot notation)

## Critical Notes for Agents

1. **Trust These Instructions**: Only search/explore if information here is incomplete or incorrect
2. **Minimal Changes**: This is a focused utility - make surgical changes only
3. **Build Before Lint**: Always required - some lint rules check generated files
4. **All Lints Must Pass**: CI runs 5 separate lint checks that all must succeed
5. **Dual Package**: Changes affect both ESM and CJS builds via tshy
6. **Node.js Version**: Use 18.19.0+ (22.18.0 recommended per .nvmrc)
7. **Conventional Commits**: PR titles must follow conventional commit format
8. **No Force Push**: Repository doesn't allow force pushing - avoid git conflicts

## Quick Command Reference

```bash
# Full verification sequence (run before pushing)
npm install
npm run build
npm run tsc
npm test
npm run lint
npm run lint:format
npm run lint:knip
npm run lint:md
npm run lint:spelling

# Auto-fix formatting issues
npm run format
npm run lint -- --fix
```

## File Locations

- Source: `src/index.ts`
- Tests: `test/index.spec.ts`
- Config: `package.json`, `tsconfig.json`, `eslint.config.js`, `cspell.json`
- CI: `.github/workflows/*.yml`
- Build Output: `dist/` (gitignored)
- Dependencies: `node_modules/` (gitignored)
