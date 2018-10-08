import {
    Http
} from '../util/http-promise.js';

export class KeywordApi extends Http {
    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        });
    }
}