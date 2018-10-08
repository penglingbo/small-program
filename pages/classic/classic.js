import { ClassicApi } from '../../api/classic.js';
import { LikeApi } from '../../api/like.js';
let ClassicIns = new ClassicApi();
let LikeIns = new LikeApi();
Page({
    data: {
        classic: null,
        first: false,
        last: true,
        likeCount: 0,
        likeStatus: false   
    },
    onLike(event) {
        let behavior = event.detail.behavior;        
        LikeIns.like(behavior, this.data.classic.id, this.data.classic.type);
    },
    onPrevious() {
        this._updateClissic('previous');
    },
    onNext() {
        this._updateClissic('next');
    },
    /** 生命周期函数--监听页面加载 **/
    onLoad() {
        ClassicIns.getLast((res) => {
            this.setData({
                classic: res,
                likeCount: res.fav_nums,
                likeStatus: res.like_status === 1
            })
        })
    },
    _updateClissic(nextOrPrevious) {
        let curIndex = this.data.classic.index;
        ClassicIns.getClissic(curIndex, nextOrPrevious, (res) => {
            this._getLikeStatus(res.id, res.type);
            this.setData({
                classic: res,
                last: ClassicIns.isLast(res.index),
                first: ClassicIns.isFirst(res.index)
            })
        })
    },
    _getLikeStatus(artId, type) {
        LikeIns.getClissicLikeStatus(artId, type, (res) => {            
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status === 1
            });
        })
    }
})