# Developer Guide — AME.HUB v0.0.2

## 🛠️ Environment
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS 4 (Utility-first)
- **State Management**: Zustand (App Store)
- **Mocking Strategy**: Centralized mock data in `src/modules/students/mock-data.ts`.

## 📂 Key Directories
- `src/app/portal`: Role-based route structures.
- `src/features`: Shared business logic components.
- `src/store/useAppStore.ts`: The central source of truth for the demo session.

## 🔄 Adding New Features
1. **Mock Data**: Update types in `src/modules/students/types.ts` and add data in `mock-data.ts`.
2. **Store Action**: Add a new action to `useAppStore.ts` to manipulate the state.
3. **UI Component**: Build the component in `src/features` or `src/app/portal`.

## 🧪 Testing
Run the suite with:
```bash
npm run test
```
Focus is currently on **Role Routing** and **Auth Flow** simulation.
