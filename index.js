const handler = {
    get: function(obj, prop) {
        let value = obj[prop];
        if (prop.includes(".") ||
            (prop.includes("[") && prop[prop.length - 1] === "]")) {
            value = get(obj, prop, value);
        }

        return value ? value : undefined;
    },
    set: function(obj, prop, value) {
        if (prop.includes(".") ||
            (prop.includes("[") && prop[prop.length - 1] === "]")) {
            const isSuccess = set(obj, prop, value);
            return isSuccess;
        }

        obj[prop] = value;
        return true;
    }
};

function get (obj, path, def) {
    path = stringToPath(path);
    var current = obj;
    for (var i = 0; i < path.length; i++) {
        if (!current[path[i]]) return def;
        current = current[path[i]];
    }

    return current;

};

function set (obj, path, value) {
    path = stringToPath(path);
    let current = obj;
    for (let i = 0; i < path.length; i++) {
        if (current[path[i]] && i === path.length - 1) {
        current[path[i]] = value;
        return true;
        }
        if (current[path[i]]) current = current[path[i]];
    }
    return false;
};

function stringToPath (path) {
    if (typeof path !== 'string') return path;
    var output = [];
    const pathArr = path.split('.');
    for (let i = 0; i < pathArr.length; i++) {
        const keyArr = pathArr[i].split(/\[([^}]+)\]/g);
        for (let j = 0; j < keyArr.length; j++) {
            if (keyArr[j].length > 0) {
                output.push(keyArr[j]);
            }

        }
    }
    return output;
};

const deepPath = (obj) => {
    const proxied = new Proxy(obj, handler);
    return proxied;
}

export default deepPath;