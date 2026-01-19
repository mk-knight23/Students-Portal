# AME Portal — Feature Modules

The application is structured into domain-specific modules located in `src/modules/`.

## 1. Students Module
**Path:** `src/modules/students/`
- **Purpose**: Manages student identity and lifecycle.
- **Key Features**: Profile management, search, filtering, status tracking.
- **Exports**: `Student` type, `mockStudents` data.

## 2. Types Module (Global)
**Path:** `src/types/`
- **Purpose**: Shared type definitions used across multiple modules.
- **Key Features**: `UserRole`, `ApiResponse`, generic interfaces.

## 3. Documents Module
**Path:** `src/modules/documents/`
- **Purpose**: Handles file uploads and verification.
- **Key Features**: Slot generation, drag-and-drop logic, status transitions.
- **Exports**: `DocumentSlot` type, `DocumentType` enum.

## 4. Counseling Module
**Path:** `src/modules/counseling/`
- **Purpose**: Manages counseling participation and choices.
- **Key Features**: College selection, preference ordering, round management.
- **Exports**: `CounselingSession` type, `mockColleges`.

## 5. Payments Module
**Path:** `src/modules/payments/`
- **Purpose**: Financial tracking.
- **Key Features**: Fee breakdown, payment gateways (mock), receipt generation.
- **Exports**: `PaymentRecord` type, `FeeStructure`.

## 6. Dashboard Module
**Path:** `src/modules/dashboard/`
- **Purpose**: Aggregates data for view-specific dashboards.
- **Key Features**: Widget definitions, layout configuration.
- **Exports**: `DashboardConfig`, `WidgetType`.

## 7. Compliance Module
**Path:** `src/modules/compliance/`
- **Purpose**: Regulatory features.
- **Key Features**: Audit logging, DPDPA consent tracking.
- **Exports**: `AuditLog`, `ConsentRecord`.

## 8. Reports Module
**Path:** `src/modules/reports/`
- **Purpose**: Data export and visualization.
- **Key Features**: PDF/Excel generation logic, report templates.
- **Exports**: `ReportTemplate`, `ExportFormat`.

## 9. Agents Module
**Path:** `src/modules/agents/`
- **Purpose**: Affiliate management.
- **Key Features**: Referral linking, commission calculation.
- **Exports**: `AgentProfile`, `CommissionRecord`.

## 10. Branches Module
**Path:** `src/modules/branches/`
- **Purpose**: Multi-tenancy support.
- **Key Features**: Branch configuration, staff assignment.
- **Exports**: `Branch` type.

## 11. Settings Module
**Path:** `src/modules/settings/`
- **Purpose**: System-wide configuration.
- **Key Features**: Feature toggles, notification settings.
- **Exports**: `SystemSettings`.

## 12. Analytics Module
**Path:** `src/modules/analytics/`
- **Purpose**: Business intelligence.
- **Key Features**: Aggregation logic, chart datasets.
- **Exports**: `Metric`, `ChartData`.
