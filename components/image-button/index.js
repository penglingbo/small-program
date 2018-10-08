Component({
    options: {
        multipleSlots: true
    },
    properties: {
        openType: {
            type: String,
            value: ''
        }
    },
    data: {

    },
    methods: {
        onGetUserInfo(event) {
            this.triggerEvent('getUserInfo', event.detail, {})
        },
    }
})