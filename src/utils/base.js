export default {
    //深拷贝
    deepCopy (obj) {
        let result = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deepCopy(obj[key]); //递归复制
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    },
    // 清空
    deleteObject (obj) {
        let result = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key == 'menuTree') {
                    result[key] = ''
                }
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deleteObject(obj[key])
                } else {
                    result[key] = '';
                }
            }
        }
        return result;
    },
    setCookie (cname, value, expiredays) {
        let exdate = new Date();

        exdate.setTime(exdate.getTime() + (expiredays * 24 * 60 * 60 * 1000));
        let expires = expiredays ? 'expires=' + exdate.toGMTString() : '';

        document.cookie = `${cname}=${escape(value)};${expires};path=/;domain=${document.domain}`;
    },
    getCookie (cname) {
        if (document.cookie.length > 0) {
            var cstart = document.cookie.indexOf(cname + "=");

            if (cstart != -1) {
                cstart = cstart + cname.length + 1;
                var cend = document.cookie.indexOf(";", cstart);

                if (cend == -1) {
                    cend = document.cookie.length;
                }
                return unescape(document.cookie.substring(cstart, cend));
            }
        }
        return "";
    },
    // 页码统一处理
    pagination(data, callback) {
        return {
            onChange: (current) => {
                callback(current);
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条`;
            },
            // showQuickJumper: true
        }
    },
}
