import { BookApi } from '../../api/book.js';
import { LikeApi } from '../../api/like.js';
const BookIns = new BookApi();
const LikeIns = new LikeApi();

Page({
    data: {
        comments: [],
        book: null,
        likeStatus: false,
        likeCount: 0,
        posting: false
    },
    onLoad: function(options) {
        wx.showLoading();
        const bid = options.bid;        
        const detail = BookIns.getDetail(bid);
        const comments = BookIns.getComments(bid);
        const likeStatus = BookIns.getLikeStatus(bid);
        Promise.all([detail, comments, likeStatus]).then(res => {            
            this.setData({
                book: res[0],
                comments: res[1].comments,
                likeStatus: res[2].like_status,
                likeCount: res[2].fav_nums
            });
            wx.hideLoading();
        });
    },
    onLike(event) {        
        const likeOrCancel = event.detail.behavior;
        LikeIns.like(likeOrCancel, this.data.book.id, 400);
    },
    onFacePost() {
        this.setData({
            posting: true
        });
    },
    onCancel() {
        this.setData({
            posting: false
        }); 
    },
    onPost(event) {
        const comment = event.detail.text || event.detail.value;
        if (!comment) {
            return;
        }
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            });
            return;
        }
        BookIns.postComment(this.data.book.id, comment).then((res) => {
            wx.showToast({
                title: '+ 1',
                icon: 'none'
            });
            this.data.comments.unshift({
                content: comment,
                nums: 1
            });
            this.setData({
                comments: this.data.comments,
                posting: false
            });
        })
    }
})