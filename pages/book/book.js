import { random } from '../../util/common.js';
import { BookApi } from '../../api/book.js';
const BookIns = new BookApi();

Page({
    data: {
        books: [],
        searching: false,
        more: ''
    },
    onLoad: function(options) {
        BookIns.getHotList().then((data) => {            
            this.setData({
                books: data
            })
        });
    },
    onSearch() {
        this.setData({
            searching: true
        })
    },
    onCancel() {
        this.setData({
            searching: false
        })
    },
    /**
    * 页面上拉触底事件的处理函数
    */
    onReachBottom: function () {
        this.setData({
            more: random(20)
        })
    },
})