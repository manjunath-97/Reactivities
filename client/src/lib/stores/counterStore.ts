import {  makeAutoObservable } from "mobx";

export default class CounterStore {
    title = "Counter store";
    count = 0;
    events = [`Initial count : ${this.count}`]

    constructor() {
        makeAutoObservable(this);
    }

    increment = (count = 1) => {
        this.count += count;
        this.events.push(`Incremented by ${count}, now, the count is ${this.count}`);
    }

    decrement = (count = 1) => {
        this.count -= count;
        this.events.push(`Decremented by ${count}, now, the count is ${this.count}`);
    }

    get getTotalCount() {
        return this.events.length;
    }
}