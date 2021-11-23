function read(input,callback) {
    //支持chrome IE10
    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function () {
            console.log(this.result);
            if(typeof callback === 'function'){
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
        if(typeof callback === 'function'){
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
        if(typeof callback === 'function'){
            callback(toJSON(xmlDoc.xml));
        }
    } else {
        alert('error');
    }
}

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
