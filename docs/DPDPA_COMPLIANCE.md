# DPDPA 2023 Compliance Guide

## Overview
The Digital Personal Data Protection Act, 2023 (DPDPA) is India's comprehensive data privacy law. This portal is designed from the ground up to comply with its key requirements.

## Key Compliance Areas

### 1. Lawful Processing & Consent
- **Explicit Consent**: All students/parents must provide explicit digital consent during registration.
- **Purpose Limitation**: Data is collected only for the stated purpose (admission processing).
- **Consent Logging**: Every consent action is recorded in the `AuditLog` with a timestamp.

### 2. Data Minimization
- We collect only the data necessary for the admission process.
- Fields like caste and religion are optional and collected only for reservation purposes.

### 3. Aadhaar & APAAR ID Handling
- **Masking**: Aadhaar numbers are masked (e.g., `XXXX-XXXX-1234`) immediately upon entry into the system.
- **Server-Side Only**: The full Aadhaar number is never stored in plaintext or exposed client-side.
- **Verhoeff Validation**: All Aadhaar/APAAR IDs are validated using the Verhoeff checksum algorithm.

### 4. Right to Access, Correction, and Erasure
- **Access**: Students can view their data through the self-service portal.
- **Correction**: Staff can update data upon verified request; all changes are logged.
- **Erasure (Right to be Forgotten)**: A dedicated workflow exists for processing erasure requests within the 72-hour compliance window.

### 5. Data Security
- **Encryption at Rest**: The PostgreSQL database is configured for AES-256 encryption.
- **Transit Security**: All connections are over HTTPS/TLS.
- **Role-Based Access**: Strict RBAC ensures only authorized personnel can access PII.

### 6. Immutable Audit Ledger
Every action involving personal data is logged:
- `actorId`: The user who performed the action.
- `action`: The type of action (e.g., `VIEW_PII`, `UPDATE_RECORD`, `REGISTER_STUDENT`).
- `entity`: The affected data entity.
- `tenantId`: Ensures logs are isolated per tenant.
- `createdAt`: Immutable timestamp.

## Implementation Checklist
| Requirement | Status | Notes |
|-------------|--------|-------|
| Explicit Consent | ✅ | Form includes consent checkbox |
| Aadhaar Masking | ✅ | `aadhaarMasked` field in `Student` model |
| Audit Logging | ✅ | `AuditLog` model with all required fields |
| Right to Erasure API | 🚧 | Workflow defined, UI pending |
| Data Encryption | 🚧 | Depends on DB-level configuration |
