Component({
    properties: {
        book: {
            type: Object,
            value: {}
        }
    },
    data: {

    },
    methods: {
        onTap() {
            const bid = this.properties.book.id;
            wx.navigateTo({
                url: `/pages/book-detail/book-detail?bid=${bid}`,
            })
        }
    }
})