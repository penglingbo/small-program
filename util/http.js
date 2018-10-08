import { CONFIG } from '../config.js';
const HTTP_ERROR = {
    none: '未知错误',
    301: '永久重定向',
    400: '请求包含不支持的参数',
    401: '未授权',
    403: '被禁止访问',
    404: '请求的资源不存在',
    413: '上传的File体积太大',
    500: '内部错误'
};
export class Http {
    request(params) {
        let _this = this;
        wx.request({
            url: CONFIG.API_BASE_URL + params.url,
            data: params.data,
            header: Object.assign({}, {
                appkey: CONFIG.APP_KEY,
                // 'Content-Type': (params.method && params.method.toLowerCase() === 'post') ? 'application/x-www-form-urlencoded' : 'application/json'
                'Content-Type': 'application/json'
            }, params.header),
            method: params.method || 'GET',
            dataType: params.dataType || 'json',
            responseType: params.responseType || 'text',
            success(res) {                
                let code = res.statusCode + '';
                if (code.startsWith('2')) {
                    typeof params.success === 'function' && params.success(res.data);  
                } else {
                    if (typeof params.fail === 'function') {
                        params.fail(res);
                    } else {
                        let title = HTTP_ERROR[res.statusCode] ? HTTP_ERROR[code] : '错误码：' + res.data.error_code
                        wx.showToast({
                            title,
                            icon: 'none'                            
                        })
                    }
                }
            },
            fail(err) {                
                _this._showError('none');
            },
            complete(res) {
                typeof params.complete === 'function' && params.complete(res);
            }
        })
    }
    _showError(errCode) {
        let code = errCode || 'none';
        wx.showToast({
            title: HTTP_ERROR[code],
            icon: 'none'            
        })  
    }
}