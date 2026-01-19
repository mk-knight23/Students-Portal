# Run Guide — AME.HUB v0.0.2

## 🚀 Instant Launch
The AME Portal is designed for zero-config demo runs.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open the Hub
Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🔑 Demo Personas
You can enter any portal by clicking its card on the landing page.

- **Student**: View personalized counseling status, documents, and payments.
- **Office Admin**: Executive overview of all branches and global student master.
- **Office Staff**: Regional verification tasks and payment monitoring.
- **Parent**: Monitor student progress and fee status.
- **Agent**: Track referrals and commissions.
- **Auditor**: Compliance logs and DPDPA audit trails.

## 💡 Pro Tips
- **Session State**: Changes you make (like updating a document status) are stored in `sessionStorage`. They will persist if you navigate between portals but will reset if you close the tab or refresh.
- **Mock Data**: All students, payments, and logs are generated in-memory.
