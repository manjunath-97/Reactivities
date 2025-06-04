import { StoreContext } from "../stores/store";
import { useContext } from "react";

export default function useStore() {
    return useContext(StoreContext);
}