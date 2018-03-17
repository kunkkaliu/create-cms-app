/**
 * Created by liudonghui on 17/6/10.
 */
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentListeners = [];
        this.nextListeners = this.currentListeners;
    }

    ensureCanMutateNextListeners = () => {
        if (this.nextListeners === this.currentListeners) {
            this.nextListeners = this.currentListeners.slice()
        }
    }

    dispatch = (routes) => {
        this.routes = routes;
        var listeners = this.currentListeners = this.nextListeners;
        listeners.forEach(listener => listener());
    }

    subscribe = (listener) => {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.')
        }
        var isSubscribed = true;
        this.ensureCanMutateNextListeners();
        this.nextListeners.push(listener);
        return () => {
            if (!isSubscribed) {
                return
            }
            isSubscribed = false;
            this.ensureCanMutateNextListeners();
            var index = this.nextListeners.indexOf(listener);
            this.nextListeners.splice(index, 1)
        }
    }
}

export default Router;