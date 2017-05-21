import types from './mutation-types'

export default {
    [types.LOGIN] (state, token) {
        window.localStorage.setItem('back_token', token);
        state.token = token;
    },
    [types.LOGOUT] (state) {
        window.localStorage.removeItem('back_token');
        state.token = '';
    },
    [types.TITLE] (state, title) {
        window.document.title = title + ' - 后台管理系统';
        state.title = title;
    }
}