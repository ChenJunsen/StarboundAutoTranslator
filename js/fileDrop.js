/**
 * 拖拽文件
 * @param dropZoneId 拖放区域的id
 * @param getDropFileCallBack 拖拽回调
 */
function dropFile(dropZoneId,getDropFileCallBack){
    const dropZone = document.getElementById(dropZoneId);
    dropZone.addEventListener("dragenter", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);

    dropZone.addEventListener("dragover", function (e) {
        e.dataTransfer.dropEffect = 'copy'; // 兼容某些三方应用，如圈点
        e.preventDefault();
        e.stopPropagation();
    }, false);

    dropZone.addEventListener("dragleave", function (e) {
        e.preventDefault();
        e.stopPropagation();
    }, false);

    dropZone.addEventListener("drop", function (e) {
        let i;
        e.preventDefault();
        e.stopPropagation();

        const df = e.dataTransfer;
        const dropFiles = []; // 拖拽的文件，会放到这里
        let dealFileCnt = 0; // 读取文件是个异步的过程，需要记录处理了多少个文件了
        const allFileLen = df.files.length; // 所有的文件的数量，给非Chrome浏览器使用的变量

        // 检测是否已经把所有的文件都遍历过了
        function checkDropFinish() {
            if (dealFileCnt === allFileLen - 1 && typeof getDropFileCallBack === 'function') {
                getDropFileCallBack(dropFiles);
            }
            dealFileCnt++;
        }

        if (df.items !== undefined) {
            // Chrome拖拽文件逻辑
            for (i = 0; i < df.items.length; i++) {
                const item = df.items[i];
                if (item.kind === "file" && item.webkitGetAsEntry().isFile) {
                    const file = item.getAsFile();
                    dropFiles.push(file);
                    // console.log(file);
                    checkDropFinish();
                }
            }
        } else {
            // 非Chrome拖拽文件逻辑
            for (i = 0; i < allFileLen; i++) {
                const dropFile = df.files[i];
                if (dropFile.type) {
                    dropFiles.push(dropFile);
                    checkDropFinish();
                } else {
                    try {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(dropFile.slice(0, 3));

                        fileReader.addEventListener('load', function (e) {
                            console.log(e, 'load');
                            dropFiles.push(dropFile);
                            checkDropFinish();
                        }, false);

                        fileReader.addEventListener('error', function (e) {
                            console.log(e, 'error，不可以上传文件夹');
                            checkDropFinish();
                        }, false);

                    } catch (e) {
                        console.log(e, 'catch error，不可以上传文件夹');
                        checkDropFinish();
                    }
                }
            }
        }
    }, false);
}

