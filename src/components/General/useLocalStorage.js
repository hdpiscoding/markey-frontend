const useLocalStorage = (key) => {
    const get = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        }
        catch (error) {
            console.log(error);
        }
    };

    const set = (value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.log(error);
        }
    }

    const remove = () => {
        try {
            window.localStorage.removeItem(key);
        }
        catch (error) {
            console.log(error);
        }
    }

    return { get, set, remove };
}

export default useLocalStorage;