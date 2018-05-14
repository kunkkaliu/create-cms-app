
// 优化很多的 switch case 的写法
export function ReducerFactory(defState, name) {

    const context = {};

    if (name) {
        context.name = name;
    }

    const reducer = function (state = defState, action) {
        if (context[action.type]) {
            return context[action.type](state, action);
        }

        return state;
    };

    reducer.action = function (type, handle) {
        context[type] = handle;
    };
    
    reducer.extends = function (r) {
        Object.assign(context, r.getContext());
        return reducer;
    };
    
    reducer.getAction = function (type) {
        return context[type] || null;
    };

    reducer.getContext = function () {
        return context;
    };

    return reducer;
}
