/**
 * 读取本地文件
 * @param input
 * @param callback
 */
function readFile(input, callback) {
    let fileName='翻译的文件.json'
    let original=null
    //支持chrome IE10
    if (window.FileReader) {
        const file = input.files[0];
        console.log(file)
        fileName = file.name;
        const reader = new FileReader();
        reader.onload = function () {
            console.log(this.result);
            original=toJSON(this.result);
            if (typeof callback === 'function') {
                callback(original,fileName);
            }
        }
        reader.readAsText(file);
    }
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined') {
        let xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        console.log(xmlDoc.xml);
        original=toJSON(xmlDoc.xml);
        if (typeof callback === 'function') {
            callback(original,fileName);
        }
    }
    //支持FF
    else if (document.implementation && document.implementation.createDocument) {
        let xmlDoc;
        xmlDoc = document.implementation.createDocument("", "", null);
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        console.log(xmlDoc.xml);
        original=toJSON(xmlDoc.xml);
        if (typeof callback === 'function') {
            callback(original,fileName);
        }
    } else {
        alert('error');
    }
}

/**
 * 普通String对象转换为JSON对象
 * @param result
 * @returns {null}
 */
function toJSON(result) {
    if (result) {
        let obj = null;
        try {
            obj = JSON.parse(result);
        } catch (e) {
            console.error("转换失败,这不是一个json类型的文档:");
            console.error(e);
            alert("转换失败,这不是一个json类型的文档")
        }
        return obj;
    } else {
        return null;
    }
}

/**
 * 判断对象是否是数组
 * @param value
 * @returns {arg is any[]|boolean}
 */
function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

/**
 * 判空
 * @param s
 * @returns {boolean}
 */
function isEmpty(s) {
    return s === null || s === '' || s === undefined;
}

/**
 * 屎大棒文件专用解析,形如:
 * <pre>
 *     [
 *          {
 *              "Texts":{
 *                  "Eng":"xxxxxx"
 *              }
 *          }
 *     ]
 * </pre>
 * @param json
 * @returns {{}}
 */
function sbScriptParser(json) {
    const tempMap = {};
    if (json != null && isArrayFn(json)) {
        for (let i = 0; i < json.length; i++) {
            let p = json[i];
            if (!isEmpty(p['Texts']) && !isEmpty(p['Texts']['Eng'])) {
                tempMap[i] = (p['Texts']['Eng'])
            }
        }
    } else {
        console.warn("待解析的文件格式不对!")
    }
    return tempMap;
}
