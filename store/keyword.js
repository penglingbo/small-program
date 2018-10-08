export class KeywordStore {
    constructor() {
        this.key = 'q';
        this.maxLen = 10;
    }
    setHistory(keyword) {
        let words = this.getHistory();
        const has = words.includes(keyword);
        if (!has) {
            const length = words.length;
            if (length >= this.maxLen) {
                words.pop();
            }
            words.unshift(keyword); 
            wx.setStorageSync(this.key, words);
        }
    }
    getHistory() {
        return wx.getStorageSync(this.key) || [];
    }
    getHot() {

    }
}