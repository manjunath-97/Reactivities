import CounterStore from "./counterStore";
import UiStore from "./uiStore"
import { createContext } from "react"


interface Store {
	counterStore: CounterStore;
	uiStore: UiStore
}

export const store: Store = {
	counterStore: new CounterStore(),
	uiStore: new UiStore()
}

export const StoreContext = createContext(store);