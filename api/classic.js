import { Http } from '../util/http.js';

export class ClassicApi extends Http {
    getLast(callback) {
        let _this = this;
        this.request({
            url: '/classic/latest',
            success(res) {                
                callback(res);
                _this._setLastIndexStorage(res.index);
                let key = _this._getKey(res.index);
                wx.setStorageSync(key, res)
            }
        })
    }
    getClissic(curIndex, nextOrPrevious, callback) {
        let _this = this;
        let key = nextOrPrevious === 'next' ? this._getKey(curIndex + 1) : this._getKey(curIndex - 1);
        let clissic = wx.getStorageSync(key);
        if (!clissic) {
            this.request({
                url: `/classic/${curIndex}/${nextOrPrevious}`,
                success(res) {
                    wx.setStorageSync(_this._getKey(res.index), res);
                    callback(res);
                }
            })
        } else {
            callback(clissic);
        }        
    }
    isFirst(curIndex) {        
        return curIndex === 1;
    }
    isLast(curIndex) {
        return this._getLastIndexStorage() === curIndex;
    }
    _setLastIndexStorage(index) {
        wx.setStorageSync('last', index);
    }
    _getLastIndexStorage() {
        return wx.getStorageSync('last');
    }
    _getKey(index) {
        return `classic-${index}`;
    }
}
