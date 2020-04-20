import axios from 'axios';
import {Modal} from 'antd';
import base from './base';

const service = axios.create({
    baseURL: '/mocks',
    timeout: 1000
});

// 请求类型
const METHODS = {
    1: ['get', 'delete'],
    2: ['post', 'put']
};

const checkThen = function (response) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {
            if (response.data.successFlag) {
                resolve(response.data.result);
            } else {
                Modal.info({
                    title: '提示',
                    content: response.data.msg,
                });
            }
        } else {
            reject(response.data)
        }
    })
};

const checkCatch = function (response) {
    return new Promise((resolve, reject) => {
        reject(response.data);
    })
};


function buildRequest (method, url, params = {}) {
    const args = {method, url};

    if (METHODS[1].includes(method)) {
        args.params = params;
    } else if (METHODS[2].includes(method)) {
        args.data = params;
    }
    return service(args).then(checkThen).catch(checkCatch);
}

const get = (url, params) => buildRequest('get', url, params);

const post = (url, params) => buildRequest('post', url, params);

const del = (url, params) => buildRequest('delete', url, params);

const put = (url, params) => buildRequest('put', url, params);

// 表格参数定制
const requestList = (_this, url, params) => {
    get(url, params).then(data => {
        if (data) {
            _this.setState({
                list: data['item_list'].map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: base.pagination(data, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            });
        }
    });
};


export default {get, post, del, put, requestList};
