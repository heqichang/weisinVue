import api from './api';

export default {
    login (name, pass, cb) {
        cb = arguments[arguments.length - 1]
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return
        }
        loginRequest(name, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                localStorage.id = res.id;
                if (cb) cb(true);
                this.onChange(true)
            } else {
                if (cb) cb(false);
                this.onChange(false)
            }
        })
    },

    getToken () {
        return localStorage.token;
    },

    getId () {
        return localStorage.id;
    },

    logout (cb) {
        delete localStorage.token;
        delete localStorage.id;
        if (cb) cb();
        this.onChange(false)
    },

    loggedIn () {
        return !!localStorage.token
    },

    onChange () {}
}



function loginRequest(name, pass, callback) {
    api.login(name, pass).then(function (res) {
        if (res.status == 200) {
            callback({
                authenticated: true,
                token: res.data.token,
                id: res.data.id,
            });
        } else {
            callback({
                authenticated: false,
                reason: "登录出现问题"
            });
        }

    }).catch(function (error) {
        let reason = error.status < 500 ? '登录出现问题' : '服务器出现问题';
        callback({
            authenticated: false,
            reason: reason
        });
    })
}