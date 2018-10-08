Component({
    properties: {
        title : {
            type: String,
            value: ''
        },
        first: {
            type: Boolean,
            value: false
        },
        latest: {
            type: Boolean,
            value: false
        }
    },
    data: {
        disLeftSrc: 'images/triangle.dis@left.png',
        leftSrc: 'images/triangle@left.png',
        disRightSrc: 'images/triangle.dis@right.png',
        rightSrc: 'images/triangle@right.png'
    },
    methods: {
        onLeft(event) {            
            if (!this.properties.first) {
                this.triggerEvent('left', {})
            }           
        },
        onRight(event) {            
            if (!this.properties.latest) {                
                this.triggerEvent('right', {})
            }           
        }
    }
})