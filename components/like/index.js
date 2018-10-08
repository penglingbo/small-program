Component({
    properties: {
        like: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 0
        }
    },
    data: {
    },
    methods: {
        onLink(e) {
            let count = this.properties.count;
            count = this.properties.like ? count - 1 : count + 1;  
            this.setData({
                count,
                like: !this.properties.like
            });
            let behavior = this.properties.like ? 'like' : 'cancel';
            // 向父组件发射事件
            this.triggerEvent('like', {
                behavior: behavior
            });            
        }
    }
})