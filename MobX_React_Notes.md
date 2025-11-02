
# 🧩 **MobX + React Notes**

## 🧠 What is MobX?
MobX is a **state management library** that makes your data **reactive** — when your data changes, the UI automatically updates.
Think of MobX as: “Make my plain JavaScript objects come alive.”

---

## ⚙️ 1. Making a Store Reactive
```ts
import { makeAutoObservable } from "mobx";

export class ActivityStore {
  filter = 'all';
  startDate = new Date().toISOString();

  constructor() {
    makeAutoObservable(this);
  }

  setFilter = (filter: string) => {
    this.filter = filter;
  }

  setStartDate = (date: Date) => {
    this.startDate = date.toISOString();
  }
}
```

### 🧩 What Happens Here
| Concept | Explanation |
|----------|--------------|
| `makeAutoObservable(this)` | Automatically makes everything reactive |
| `filter`, `startDate` | Observable state (MobX tracks them) |
| `setFilter`, `setStartDate` | Actions (methods that change state) |
| `get something()` | Computed (derived values recalculated when needed) |

---

## 🧭 2. Creating a Root Store
```ts
import { createContext } from "react";
import CounterStore from "./counterStore";
import UiStore from "./uiStore";
import ActivityStore from "./activityStore";

interface Store {
  counterStore: CounterStore;
  uiStore: UiStore;
  activityStore: ActivityStore;
}

export const store: Store = {
  counterStore: new CounterStore(),
  uiStore: new UiStore(),
  activityStore: new ActivityStore()
};

export const StoreContext = createContext(store);
```

### 🧩 Step-by-Step
| Step | Purpose | Think of it as |
|------|----------|----------------|
| 1️⃣ Import stores | Bring all individual stores | “Collect your tools” |
| 2️⃣ Define `interface Store` | Type safety & structure | “Draw the blueprint” |
| 3️⃣ Create `store` | Instantiate all stores | “Build the house” |
| 4️⃣ Create `StoreContext` | Share stores globally | “Give everyone a key” |

---

## ⚛️ 3. Connecting MobX to React
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { StoreContext, store } from "./stores/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
```

---

## 🎯 4. Using a Store Inside a Component
```tsx
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../stores/store";

const ActivityList = observer(() => {
  const { activityStore } = useContext(StoreContext);

  return (
    <div>
      <h3>Filter: {activityStore.filter}</h3>
      <button onClick={() => activityStore.setFilter('completed')}>
        Show Completed
      </button>
    </div>
  );
});

export default ActivityList;
```

---

## 🧩 5. MobX Building Blocks — Summary
| Type | Keyword | Example | Description |
|------|----------|----------|--------------|
| Observable | `makeAutoObservable` | `filter = 'all'` | Reactive data |
| Action | Inside class method | `setFilter()` | Modifies observables |
| Computed | `get` property | `get filteredList()` | Derived values |
| Reaction | `observer` | Component re-renders when state changes |

---

## ⚡ Quick Recap
- `makeAutoObservable(this)` → Makes your class reactive  
- `store.ts` → Combines all stores in one root object  
- `StoreContext` → Lets React components access stores globally  
- `observer()` → Reacts to observable changes

---

## 🧘 Mnemonic: O.A.C.R.
**O**bservable → data  
**A**ction → change data  
**C**omputed → derived data  
**R**eaction → UI updates automatically  
