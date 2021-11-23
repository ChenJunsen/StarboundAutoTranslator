/**
 * 读取本地文件
 * @param input
 * @param callback
 */
function read(input, callback) {
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function () {
            console.log(this.result);
            if (typeof callback === 'function') {
                callback(toJSON(this.result));
            }
        }
        reader.readAsText(file);
    }
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined') {
        var xmlDoc;
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        console.log(xmlDoc.xml);
        if (typeof callback === 'function') {
            callback(toJSON(xmlDoc.xml));
        }
    }
    //支持FF
    else if (document.implementation && document.implementation.createDocument) {
        var xmlDoc;
        xmlDoc = document.implementation.createDocument("", "", null);
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        console.log(xmlDoc.xml);
        if (typeof callback === 'function') {
            callback(toJSON(xmlDoc.xml));
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
        var obj = null;
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

function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

function isEmpty(s) {
    return s === null || s === '' || s === undefined;
}
var count=-1;
var tempArray=[];
function sbScriptParser(json) {
    if (json != null) {
        for (var p in json) {
            if (isArrayFn(p)) {//数组
                sbScriptParser(p)
            } else {//普通对象
                for(var pp in p){
                    if (!isEmpty(pp['Eng']) && isEmpty(pp['Chs'])) {
                        count++;
                        p['Chs']=count+'';
                        tempArray.push(p['Eng']);
                    }else{
                        sbScriptParser(pp);
                    }
                }
            }
        }
    }
}
