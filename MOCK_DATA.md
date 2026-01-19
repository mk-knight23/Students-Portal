# Mock Data Guide — AME.HUB v0.0.2

## 🛡️ Architecture
AME.HUB v0.0.2 runs on a purely reactive mock data engine. 6 portals derive their vitality from modular mock sets in `src/modules/`.

## 📦 Data Modules
- **Students**: 100+ generated records with lifecycle states (Verified, Counseling, Allotted).
- **Documents**: 8 distinct slots for each student with status tracking (Uploaded, Rejected, Verified).
- **Payments**: Simulated fee structures with transaction history for parent-staff synchronization.
- **Counseling**: Mock college preferences and allotment results for the Admission Engine.
- **Audit Logs**: Simulated DPDPA entries for the Auditor portal.

## 🔄 Lifecycle
All states are managed by **Zustand** and persisted in **Session Storage** (`sessionStorage`).
- **Persistence**: Navigating between portals maintains your current mock state.
- **Reset**: Refreshing the browser or closing the tab resets the demo environment to baseline v0.0.2.

## 🚀 Future Integration
This structure is ready to be swapped with **Prisma Service** calls once the Postgres backend is activated in v0.2.x.
