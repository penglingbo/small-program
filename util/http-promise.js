import {
    CONFIG
} from '../config.js';
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
    request({
        url,
        data = {},
        method = 'GET',
        header = {},
        dataType = 'json',
        responseType = 'text'
    }) {
        const _this = this;
        return new Promise((resolve, reject) => {
            wx.request({
                url: CONFIG.API_BASE_URL + url,
                data: data,
                header: Object.assign({}, {
                    appkey: CONFIG.APP_KEY,
                    // 'Content-Type': (method.toLowerCase() === 'post') ? 'application/x-www-form-urlencoded' : 'application/json'
                    'Content-Type': 'application/json'
                }, header),
                method: method,
                dataType: dataType,
                responseType: responseType,
                success(res) {
                    const code = res.statusCode + '';
                    if (code.startsWith('2')) {
                        resolve(res.data);
                    } else {
                        reject();
                        const title = HTTP_ERROR[res.statusCode] ? HTTP_ERROR[code] : '错误码：' + res.data.error_code
                        wx.showToast({
                            title,
                            icon: 'none'
                        })
                    }
                },
                fail(err) {
                    reject();                    
                    _this._showError('none');
                }
            })
        });
    }
    _showError(errCode) {
        const code = errCode || 'none';
        wx.showToast({
            title: HTTP_ERROR[code],
            icon: 'none'
        })
    }
}