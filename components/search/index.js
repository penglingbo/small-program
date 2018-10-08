import { KeywordStore } from '../../store/keyword.js';
import { KeywordApi } from '../../api/keyword.js';
import { BookApi } from '../../api/book.js';
import { paginationBeh } from '../../behaviors/pagination.js';
const keywordStoreIns = new KeywordStore();
const keywordIns = new KeywordApi();
const BookIns = new BookApi();

Component({
    behaviors: [paginationBeh],
    properties: {
        more: {
            type: String,
            value: '',
            observer: 'loadMore'
        }
    },
    data: {
        historyWords: [],
        hotWords: [],        
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },
    attached() {        
        this.setData({
            historyWords: keywordStoreIns.getHistory()
        });
        keywordIns.getHot().then((res) => {
            this.setData({
                hotWords: res.hot
            });
        });
    },
    methods: {
        onCancel() {
            this.triggerEvent('cancel', {}, {});
        },
        onDelete() {
            this.setData({
                searching: false,
                q: ''
            });
            this.init();
        },
        onConfirm(event) {
            this.setData({
                searching: true
            });
            this._showLoadingCenter();
            this.init();
            const word = event.detail.text || event.detail.value;            
            BookIns.search(0, word).then(res => {
                this.setMoreData(res.books);
                this.setTotal(res.total);
                this.setData({
                    q: word
                });
                keywordStoreIns.setHistory(word);
                this._hideLoadingCenter();
            }).catch(() => {
                this._hideLoadingCenter();
            });
        },
        loadMore() {
            if (!this.data.q) {
                return;
            }
            if (this.data.loading) {
                return;
            }            
            if (this.hasMore()) {
                this._showLoading();
                BookIns.search(this.getCurrentStart(), this.data.q).then(res => {
                    this.setMoreData(res.books);
                    this._hideLoading();
                    console.log(this.data.dataArray.length)
                }).catch(() => {
                    this._hideLoading();
                });
            }
        },
        _showLoading() {
            this.setData({
                loading: true
            });
        },
        _hideLoading() {
            this.setData({
                loading: false
            });
        },
        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            });
        },
        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            });
        }
    }
})