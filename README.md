# 前言
在尝试翻译富兰克林mod的文本时，用到了百度翻译。发现机翻的准确性很高。而重复地筛选文本再拷贝翻译的操作对于一个程序员来讲是很枯燥的，于是萌生了写这个工具的想法。本人擅长前端和安卓开发，而文本翻译就只剩下前端网页了。目前先写了个纯html的翻译器。后期考虑使用vue进行改写，可以对UI及功能有更好的支持。
# 工具特色
## 1、使用百度翻译的api进行机翻，质量有保证
## 2、支持单个json文件，内容格式形如:

```javascript
[
    {
        "Texts":{
            "Eng":"xxxxxx"
        }
    },
    {
    	"Texts":{
            "Eng":"xxxxxx"
        }
    }
]
```
的自动翻译。
## 3、翻译完成后，可以选择指定目录下载翻译好的文件。(当然可以指定源目录进行覆盖)
之所以没有做成自动覆盖源文件，是因为非IE浏览器没法操作系统的本地文件，这是硬伤。

# 使用方法
## 1、[注册百度翻译账号](https://fanyi-api.baidu.com/)，申请appid和key
![百度翻译](https://img-blog.csdnimg.cn/3c0e97e1a9244aa6b3c0e9f1ffa181c8.jpg)
## 2、[从github上下载源码](https://github.com/ChenJunsen/StarboundAutoTranslator)
## 3、网源码处填入appid和key
可以用VSCode、WebStorm、sublim、notepad设置记事本打开源码工程\html\translator.html
![填appid和key](https://img-blog.csdnimg.cn/b3ac83f2a17b423b94706397fc03c179.jpg)
## 4、启动
双击translator.html就可以运行了。
webstorm可以通过内嵌服务器方式启动，原理懂的都懂:
![启动](https://img-blog.csdnimg.cn/cac4dd133a604c2e820aef55b8384fdc.jpg#pic_center)
启动后的界面
![翻译机](https://img-blog.csdnimg.cn/9b0dac2681314026a969403d400ed788.jpg)
界面比较简洁，点击左侧的**选择文件**会弹出文件选择器，这里面过滤了json文件
![文件选择](https://img-blog.csdnimg.cn/ecfebba507254924b2cb2cd0380dd55c.jpg)
打开这个文件，会显示出待翻译的文本
![待翻译文本](https://img-blog.csdnimg.cn/cdaf9774a8c54d03bafb089d482b4409.jpg)
这时，我们就可以点击另外一边的**开始翻译**
![翻译结果](https://img-blog.csdnimg.cn/31026ee404c340658c07b125330f7e13.jpg)
页面会显示翻译结果。右侧会提示保存翻译好的文件(edge浏览器)
至此，使用教程就结束了。
# 异常说明
![翻译异常](https://img-blog.csdnimg.cn/6590cd3e6e85486ea5e52059c5ac66d7.jpg)
可能会出现如图的异常**52003**，**请确认你配置的appid和key是否有效**
