import { Http } from '../util/http.js';
export class LikeApi extends Http {
    like(behavior, art_id, type) {
        let url = behavior === 'like' ? '/like' : '/like/cancel'
        this.request({
            url,
            data: {
                art_id,
                type
            },
            method: 'POST'  
        })
    }
    getClissicLikeStatus(artId, type, callback) {
        this.request({
            url: `/classic/${type}/${artId}/favor`,
            success: callback
        })
    }
}