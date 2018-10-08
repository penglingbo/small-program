Component({
    options: {
        multipleSlots: true
    },    
    externalClasses: ['tag-class'],    // 组件接受的外部样式类
    properties: {
        text: {
            type: String,
            value: ''
        }
    },
    data: {

    },
    methods: {
        onTap(event) {
            this.triggerEvent('tapping', {
                text: this.properties.text
            });
        }
    }
})