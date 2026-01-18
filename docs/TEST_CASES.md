# Test Cases Documentation

## Overview
This document catalogs all test cases for the Admissions Made Easy portal. Tests are implemented using **Vitest** with **React Testing Library**.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm test:ui
```

---

## Unit Tests

### 1. Button Component (`src/components/ui/__tests__/button.test.tsx`)

| Test Case | Description | Status |
|-----------|-------------|--------|
| renders children correctly | Button displays its text content | ✅ Pass |
| applies variant classes | Destructive variant has correct styling | ✅ Pass |
| handles click events | onClick callback is invoked | ✅ Pass |
| can be disabled | Disabled button is not clickable | ✅ Pass |

### 2. Verhoeff Validation (`src/lib/validation/__tests__/verhoeff.test.ts`)

| Test Case | Description | Status |
|-----------|-------------|--------|
| validates correct Aadhaar | Valid 12-digit Aadhaar passes | ✅ Pass |
| rejects incorrect Aadhaar | Invalid checksum fails | ✅ Pass |
| rejects non-numeric input | Letters in Aadhaar fail | ✅ Pass |
| rejects wrong length | 5-digit or 13-digit inputs fail | ✅ Pass |
| handles empty input | Empty string returns false | ✅ Pass |

### 3. Student Form Schema (`src/lib/validation/__tests__/schemas.test.ts`)

| Test Case | Description | Status |
|-----------|-------------|--------|
| validates correct form | Complete valid data passes | ✅ Pass |
| rejects missing first name | Empty firstName fails | ✅ Pass |
| rejects invalid Aadhaar | Short Aadhaar fails | ✅ Pass |
| rejects NEET out of range | Score > 720 fails | ✅ Pass |
| rejects invalid email | Malformed email fails | ✅ Pass |

---

## Pending Test Coverage

### Integration Tests (Phase 5B)
- [ ] Student Registration Flow
- [ ] Authentication Flow
- [ ] Document Upload Flow
- [ ] Payment Processing Flow

### E2E Tests (Phase 5C)
- [ ] Complete Registration to Allotment
- [ ] Multi-Tenant Isolation
- [ ] Role-Based Access Verification

---

## Test Metrics

| Metric | Value |
|--------|-------|
| Total Test Files | 3 |
| Total Tests | 14 |
| Pass Rate | 100% |
| Duration | ~400ms |

---

*Last Updated: 2026-01-18*
