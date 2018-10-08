Component({
    properties: {
        index: {
            type: Number,
            value: 0,
            observer(newVal, oldVal, changedPath) {                          
                this.setData({
                    _index: ('0' + newVal).slice(-2)
                })
            }
        }
    },
    data: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        year: 0,
        month: '',
        _index: ''
    },
    attached() {
        let date = new Date();
        this.setData({
            year: date.getFullYear(),
            month: this.data.months[date.getMonth()]
        })
    },
    methods: {

    }
})