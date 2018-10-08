import {
    Http
} from '../util/http-promise.js';

export class BookApi extends Http {
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        });
    }
    search(start, q) {
        return this.request({
            url: '/book/search',
            data: {
                start,
                q,
                summary: 1
            }
        });
    }
    getMyBookCount() {
        return this.request({
            url: '/book/favor/count'
        })
    }
    getDetail(bid) {
        return this.request({
            url: `/book/${bid}/detail`
        })
    }
    getLikeStatus(bid) {
        return this.request({
            url: `/book/${bid}/favor`
        })
    }
    getComments(bid) {
        return this.request({
            url: `/book/${bid}/short_comment`
        })
    }
    postComment(book_id, content) {
        return this.request({
            method: 'POST',
            url: '/book/add/short_comment',
            data: {
                book_id,
                content
            }
        })
    }
}