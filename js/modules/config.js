export default class Config {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.config = JSON.parse(localStorage.getItem(storageKey)) || {};
    }

    set(key, value) {
        this.config[key] = value;
        localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    }

    get(key) {
        return this.config[key];
    }
}
