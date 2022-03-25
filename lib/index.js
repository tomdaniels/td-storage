"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createInstance({ driver, name }) {
    let storage;
    try {
        storage = typeof window === 'undefined' ? {} : window[driver];
    }
    catch (error) {
        console.error(driver, error);
    }
    const prefix = `${name}/`;
    return {
        storage,
        get(key) {
            let result;
            try {
                result = storage.getItem(`${prefix}${key}`);
            }
            catch (err) {
                result = null;
            }
            if (result) {
                result = JSON.parse(result);
            }
            return result;
        },
        has(key) {
            var _a;
            let result;
            try {
                result = (_a = storage.getItem) === null || _a === void 0 ? void 0 : _a.call(storage, `${prefix}${key}`);
            }
            catch (err) {
                console.error(driver, err);
            }
            return result !== null;
        },
        set(key, value) {
            const sanitised = JSON.stringify(value);
            try {
                storage.setItem(`${prefix}${key}`, sanitised);
            }
            catch (err) {
                console.error(driver, err);
            }
        },
        remove(key) {
            try {
                storage.removeItem(`${prefix}${key}`);
            }
            catch (err) {
                console.error(driver, err);
            }
        },
    };
}
exports.default = createInstance;
//# sourceMappingURL=index.js.map