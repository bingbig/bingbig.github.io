# XML DOM - XMLHttpRequest对象

最近要封装GA4GH的API接口，先提前复习一下相关的知识。

> 参考
> 1.  http://www.w3school.com.cn/xmldom/dom_http.asp
> 2.  https://segmentfault.com/a/1190000004322487

## XMLHttpRequest的发展历程

`XMLHttpRequest`一开始只是微软浏览器提供的一个接口，后来各大浏览器纷纷效仿也提供了这个接口，再后来W3C对它进行了标准化，提出了[`XMLHttpRequest`标准](https://www.w3.org/TR/XMLHttpRequest/)。`XMLHttpRequest`标准又分为`Level 1`和`Level 2`。
`XMLHttpRequest Level 1`主要存在以下缺点：

- 受同源策略的限制，不能发送跨域请求；
- 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；
- 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；

那么`Level 2`对`Level 1` 进行了改进，`XMLHttpRequest Level 2`中新增了以下功能：

- 可以发送跨域请求，在服务端允许的情况下；
- 支持发送和接收二进制数据；
- 新增formData对象，支持发送表单数据；
- 发送和获取数据时，可以获取进度信息；
- 可以设置请求的超时时间；



## XMLHttpRequest对象

`XMLHttpRequest `对象提供了对 HTTP 协议的完全的访问，包括做出 `POST `和 `HEAD`请求以及普通的 `GET `请求的能力。XMLHttpRequest 可以同步或异步地返回 Web 服务器的响应，并且能够以文本或者一个 DOM 文档的形式返回内容。

尽管名为 XMLHttpRequest，它并不限于和 XML 文档一起使用：它可以接收任何形式的文本文档。

XMLHttpRequest 对象是名为 [AJAX](http://www.w3school.com.cn/ajax/index.asp) 的 Web 应用程序架构的一项关键功能。目前，大部分浏览器对它都有很好的支持。



### 属性

#### 1. HTTP请求的状态`readyState`

从HTTP请求的状态从0到4，如下表所示：

| 状态   | 名称            | 描述                                       |
| ---- | ------------- | ---------------------------------------- |
| 0    | Uninitialized | 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。 |
| 1    | Open          | open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。   |
| 2    | Sent          | Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。 |
| 3    | Receiving     | 所有响应头部都已经接收到。响应体开始接收但未完成。                |
| 4    | Loaded        | HTTP 响应已经完全接收。                           |

- 状态值不会递减，除非请求中调用了`abort()` 和`open()`方法。
- 状态改变会触发事件`onreadystatechange`

#### 2. 响应体responseText

不包括头部。

```
readyState < 3: 空字符串

readyState = 3: 部分相应数据

readyState = 4: 完整响应体
```





#### 3. reponseXML

将请求的响应解析为Document对象返回。



#### 4. status

`HTTP状态码`， 200表示成功，404表示没有找到，当`readyState < 3`时读取这一属性会报错。



#### 5. statusText

当statu是200的时候它是“OK”，当status是404时它是“NOT FOUND”。同样，当`readyState < 3`时读取这一属性会报错。

#### 6. responseType

`responseType`是`xhr level 2`新增的属性，用来指定`xhr.response`的数据类型，目前还存在些兼容性问题.

| 值               | 数据类型            | 说明                       |
| --------------- | --------------- | ------------------------ |
| `""`            | `String`字符串     | 默认值(在不设置`responseType`时) |
| `"text"`        | `String`字符串     |                          |
| `"document"`    | `Document`对象    | 希望返回 `XML` 格式数据时使用       |
| `"json"`        | `javascript` 对象 | 存在兼容性问题，IE10/IE11不支持     |
| `"blob"`        | `Blob`对象        |                          |
| `"arrayBuffer"` | `ArrayBuffer`对象 |                          |



### 事件

`xhr`相关事件有很多，有时记起来还挺容易混乱。下面是`XMLHttpRequest`的部分实现代码：

```
interface XMLHttpRequestEventTarget : EventTarget {
  // event handlers
  attribute EventHandler onloadstart;
  attribute EventHandler onprogress;
  attribute EventHandler onabort;
  attribute EventHandler onerror;
  attribute EventHandler onload;
  attribute EventHandler ontimeout;
  attribute EventHandler onloadend;
};

interface XMLHttpRequestUpload : XMLHttpRequestEventTarget {

};

interface XMLHttpRequest : XMLHttpRequestEventTarget {
  // event handler
  attribute EventHandler onreadystatechange;
  readonly attribute XMLHttpRequestUpload upload;
};
```

从代码中我们可以看出：

1. `XMLHttpRequestEventTarget`接口定义了7个事件：
   - `onloadstart`
   - `onprogress`
   - `onabort`
   - `ontimeout`
   - `onerror`
   - `onload`
   - `onloadend`
2. 每一个`XMLHttpRequest`里面都有一个`upload`属性，而`upload`是一个`XMLHttpRequestUpload`对象
3. `XMLHttpRequest`和`XMLHttpRequestUpload`都继承了同一个`XMLHttpRequestEventTarget`接口，所以`xhr`和`xhr.upload`都有第一条列举的7个事件
4. `onreadystatechange`是`XMLHttpRequest`独有的事件

所以这么一看就很清晰了：
`xhr`一共有8个相关事件：7个`XMLHttpRequestEventTarget`事件+1个独有的`onreadystatechange`事件；而`xhr.upload`只有7个`XMLHttpRequestEventTarget`事件。

#### onreadystatechange

每次 readyState 属性改变的时候调用的事件句柄函数。当 readyState 为 3 时，它也可能调用多次。

### 事件触发条件

下面是一张`xhr`相关事件触发条件表，其中最需要注意的是 `onerror` 事件的触发条件。

| 事件                   | 触发条件                                     |
| -------------------- | ---------------------------------------- |
| `onreadystatechange` | 每当`xhr.readyState`改变时触发；但`xhr.readyState`由非`0`值变为`0`时不触发。 |
| `onloadstart`        | 调用`xhr.send()`方法后立即触发，若`xhr.send()`未被调用则不会触发此事件。 |
| `onprogress`         | `xhr.upload.onprogress`在上传阶段(即`xhr.send()`之后，`xhr.readystate=2`之前)触发，每50ms触发一次；`xhr.onprogress`在下载阶段（即`xhr.readystate=3`时）触发，每50ms触发一次。 |
| `onload`             | 当请求成功完成时触发，此时`xhr.readystate=4`          |
| `onloadend`          | 当请求结束（包括请求成功和请求失败）时触发                    |
| `onabort`            | 当调用`xhr.abort()`后触发                      |
| `ontimeout`          | `xhr.timeout`不等于0，由请求开始即`onloadstart`开始算起，当到达`xhr.timeout`所设置时间请求还未结束即`onloadend`，则触发此事件。 |
| `onerror`            | 在请求过程中，若发生`Network error`则会触发此事件（若发生`Network error`时，上传还没有结束，则会先触发`xhr.upload.onerror`，再触发`xhr.onerror`；若发生`Network error`时，上传已经结束，则只会触发`xhr.onerror`）。**注意**，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的`xhr.statusCode`是`4xx`时，并不属于`Network error`，所以不会触发`onerror`事件，而是会触发`onload`事件。 |

### 事件触发顺序

当请求一切正常时，相关的事件触发顺序如下：

1. 触发`xhr.onreadystatechange`(之后每次`readyState`变化时，都会触发一次)
2. 触发`xhr.onloadstart`
   //上传阶段开始：
3. 触发`xhr.upload.onloadstart`
4. 触发`xhr.upload.onprogress`
5. 触发`xhr.upload.onload`
6. 触发`xhr.upload.onloadend`
   //上传结束，下载阶段开始：
7. 触发`xhr.onprogress`
8. 触发`xhr.onload`
9. 触发`xhr.onloadend`

### 方法

#### abort()

取消当前响应，关闭连接并结束任何未决的网络活动。



#### getAllResponseHeaders()

把HTTP响应头部作为未解析的字符串返回。



#### getResponseHeader()

返回指定HTTP响应头的值。



#### open()

初始化HTTP请求参数，但是并不发送请求。

```js
open(method, url, async, username, password)
```

- method 参数是用于请求的 HTTP 方法。值包括 GET、POST 和 HEAD。
- async 参数指示请求使用应该异步地执行。
  - 如果这个参数是 false，请求是同步的，后续对 send() 的调用将阻塞，直到响应完全接收。
  - 如果这个参数是 true 或省略，请求是异步的，且通常需要一个 `onreadystatechange` 事件句柄。
- username 和 password 参数是可选的，为 url 所需的授权提供认证资格。如果指定了，它们会覆盖 url 自己指定的任何资格。

##### 说明

这个方法初始化请求参数以供 `send() `方法稍后使用。它把 `readyState`设置为 1，删除之前指定的所有请求头部，以及之前接收的所有响应头部，并且把 `responseText`、`responseXML`、`status` 以及 `statusText` 参数设置为它们的默认值。当 readyState 为 0 的时候（当 XMLHttpRequest 对象刚创建或者 abort() 方法调用后）以及当 readyState 为 4 时（已经接收响应时），调用这个方法是安全的。当针对任何其他状态调用的时候，open() 方法的行为是为指定的。

除了保存供 send() 方法使用的请求参数，以及重置 XMLHttpRequest 对象以便复用，open() 方法没有其他的行为。要特别注意，==当这个方法调用的时候，通常不会打开一个到 Web 服务器的网络连接==。

#### send()

发送HTTP请求，使用传递给open()方法的参数，以及传递给该方法的可选请求体。

```js
send(body)
```

如果之前没有调用 open()，或者更具体地说，如果 readyState 不是 1，send() 抛出一个异常。否则，它发送一个 HTTP 请求，该请求由以下几部分组成：

- 之前调用 open() 时指定的 HTTP 方法、URL 以及认证资格（如果有的话）。
- 之前调用 setRequestHeader() 时指定的请求头部（如果有的话）。
- 传递给这个方法的 *body* 参数。



#### setRequestHeader()

向一个==打开但未发送==的请求设置或者添加一个HTTP请求。

```js
setRequestHeader(name, value)
```

- name 参数是要设置的头部的名称。这个参数不应该包括空白、冒号或换行。
- value 参数是头部的值。这个参数不应该包括换行。

##### 说明

这个方法只有当 readyState 为 1 的时候才能调用，例如，在调用了 open() 之后，但在调用 send() 之前。

有些请求头部由 XMLHttpRequest 自动设置而不是由这个方法设置，以符合 HTTP 协议。这包括如下和代理相关的头部：

- Host
- Connection
- Keep-Alive
- Accept-charset
- Accept-Encoding
- If-Modified-Since
- If-None-Match
- If-Range
- Range

#### timeout

```js
xhr.timeout = 3000
```

单位：milliseconds 毫秒
默认值：`0`，即不设置超时







## AJAX和XMLHttpRequest

AJAX涉及异步JavaScript和XML，是一种用来更好更快和更加互动的web技术，它的实现，需要XML，HTML，CSS和JS。

AJAX基于以下标准：

1. 基于浏览器，用于展示HTML和CSS
2. 数据保存为XML格式并从服务器获取
3. 通过XMLHttpRequest后台异步获取数据到客户端浏览器
4. JavaScript无所不能

```
AJAX stands for Asynchronous JavaScript and XML. AJAX is a new technique for creating better, faster, and more interactive web applications with the help of XML, HTML, CSS, and Java Script.

AJAX is based on the following open standards:

1. Browser-based presentation using HTML and Cascading Style Sheets (CSS).
2. Data is stored in XML format and fetched from the server.
3. Behind-the-scenes data fetches using XMLHttpRequest objects in the browser.
4. JavaScript to make everything happen.
## From; http://www.tutorialspoint.com/ajax/what_is_ajax.htm
```

## 例子

```js
function sendAjax() {
  //构造表单数据
  var formData = new FormData();
  formData.append('username', 'johndoe');
  formData.append('id', 123456);
  
  //创建xhr对象 
  var xhr = new XMLHttpRequest();
  
  //设置xhr请求的超时时间
  xhr.timeout = 3000;
  
  //设置响应返回的数据格式
  xhr.responseType = "text";
  
  //创建一个 post 请求，采用异步
  xhr.open('POST', '/server', true);
  
  //注册相关事件回调处理函数
  xhr.onload = function(e) { 
	  if(this.status == 200||this.status == 304){
	  alert(this.responseText);
  }
  };
  
  xhr.ontimeout = function(e) { ... };
  xhr.onerror = function(e) { ... };
  xhr.upload.onprogress = function(e) { ... };

  //发送数据
  xhr.send(formData);
}
```

### 跟踪AJAX

```js
xhr.onreadystatechange = function () {
    switch(xhr.readyState){
      case 1://OPENED
        //do something
            break;
      case 2://HEADERS_RECEIVED
        //do something
        break;
      case 3://LOADING
        //do something
        break;
      case 4://DONE
        //do something
        break;
    }
```

### 获取上传、下载的速度

在上传或者下载比较大的文件时，实时显示当前的上传、下载进度是很普遍的产品需求。
我们可以通过`onprogress`事件来实时显示进度，默认情况下这个事件每50ms触发一次。需要注意的是，上传过程和下载过程触发的是不同对象的`onprogress`事件：

- 上传触发的是`xhr.upload`对象的 `onprogress`事件
- 下载触发的是`xhr`对象的`onprogress`事件

```js
updateProgress = xhr.upload.onprogress;
function updateProgress(event) {
    if (event.lengthComputable) {
      var completedPercent = event.loaded / event.total;
    }
 }
```



最后给点扩展学习资料，如果你：

- 想真正搞懂`XMLHttpRequest`，最靠谱的方法还是看 [W3C的xhr 标准](https://www.w3.org/TR/XMLHttpRequest/);
- 想结合代码学习如何用`XMLHttpRequest`发各种类型的数据，可以参考[html5rocks上的这篇文章](http://www.html5rocks.com/zh/tutorials/file/xhr2/)
- 想粗略的了解`XMLHttpRequest`的基本使用，可以参考[MDN的XMLHttpRequest介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)；
- 想了解`XMLHttpRequest` 的发展历程，可以参考[阮老师的文章](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)；
- 想了解`Ajax`的基本介绍，可以参考[AJAX Tutorial](http://www.tutorialspoint.com/ajax/index.htm);
- 想了解跨域请求，则可以参考[W3C的 cors 标准](https://www.w3.org/TR/cors/);
- 想了解`http`协议，则可以参考[HTTP Tutorial](http://www.tutorialspoint.com/http/http_header_fields.htm);