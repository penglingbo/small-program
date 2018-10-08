export const paginationBeh = Behavior({
    data: {
        dataArray: [],
        total: null,
        noResult: false
    },
    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray);
            this.setData({
                dataArray: tempArray
            });
        },
        getCurrentStart() {
            return this.data.dataArray.length;
        },
        setTotal(total) {
            this.data.total = total;
            if (total === 0) {
                this.setData({
                    noResult: true
                });
            }
        },
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false;
            }
            return true;
        },
        init() {
            this.setData({
                dataArray: [],
                total: null,
                noResult: false
            });
        }
    }
});