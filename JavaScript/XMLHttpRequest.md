# XML DOM - XMLHttpRequest对象

最近要封装GA4GH的API接口，先提前复习一下相关的知识。

[source: http://www.w3school.com.cn/xmldom/dom_http.asp]



## XMLHttpRequest对象

`XMLHttpRequest `对象提供了对 HTTP 协议的完全的访问，包括做出 `POST `和 `HEAD`请求以及普通的 `GET `请求的能力。XMLHttpRequest 可以同步或异步地返回 Web 服务器的响应，并且能够以文本或者一个 DOM 文档的形式返回内容。

尽管名为 XMLHttpRequest，它并不限于和 XML 文档一起使用：它可以接收任何形式的文本文档。

XMLHttpRequest 对象是名为 [AJAX](http://www.w3school.com.cn/ajax/index.asp) 的 Web 应用程序架构的一项关键功能。目前，大部分浏览器对它都有很好的支持。



## 属性

### 1. HTTP请求的状态`readyState`

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

### 2. 响应体responseText

不包括头部。

```
readyState < 3: 空字符串

readyState = 3: 部分相应数据

readyState = 4: 完整响应体
```





### 3. reponseXML

将请求的响应解析为Document对象返回。



### 4. status

`HTTP状态码`， 200表示成功，404表示没有找到，当`readyState < 3`时读取这一属性会报错。



### 5. statusText

当statu是200的时候它是“OK”，当status是404时它是“NOT FOUND”。同样，当`readyState < 3`时读取这一属性会报错。



## 事件

### onreadystatechange

每次 readyState 属性改变的时候调用的事件句柄函数。当 readyState 为 3 时，它也可能调用多次。



## 方法

### abort()

取消当前响应，关闭连接并结束任何未决的网络活动。



### getAllResponseHeaders()

把HTTP响应头部作为未解析的字符串返回。



### getResponseHead()

返回指定HTTP响应头的值。



### open()

初始化HTTP请求参数，但是并不发送请求。

```javasc
open(method, url, async, username, password)
```

- method 参数是用于请求的 HTTP 方法。值包括 GET、POST 和 HEAD。
- async 参数指示请求使用应该异步地执行。
  - 如果这个参数是 false，请求是同步的，后续对 send() 的调用将阻塞，直到响应完全接收。
  - 如果这个参数是 true 或省略，请求是异步的，且通常需要一个 `onreadystatechange` 事件句柄。
- username 和 password 参数是可选的，为 url 所需的授权提供认证资格。如果指定了，它们会覆盖 url 自己指定的任何资格。

#### 说明

这个方法初始化请求参数以供 `send() `方法稍后使用。它把 `readyState`设置为 1，删除之前指定的所有请求头部，以及之前接收的所有响应头部，并且把 `responseText`、`responseXML`、`status` 以及 `statusText` 参数设置为它们的默认值。当 readyState 为 0 的时候（当 XMLHttpRequest 对象刚创建或者 abort() 方法调用后）以及当 readyState 为 4 时（已经接收响应时），调用这个方法是安全的。当针对任何其他状态调用的时候，open() 方法的行为是为指定的。

除了保存供 send() 方法使用的请求参数，以及重置 XMLHttpRequest 对象以便复用，open() 方法没有其他的行为。要特别注意，==当这个方法调用的时候，通常不会打开一个到 Web 服务器的网络连接==。

### send()

发送HTTP请求，使用传递给open()方法的参数，以及传递给该方法的可选请求体。

```javasc
send(body)
```

如果之前没有调用 open()，或者更具体地说，如果 readyState 不是 1，send() 抛出一个异常。否则，它发送一个 HTTP 请求，该请求由以下几部分组成：

- 之前调用 open() 时指定的 HTTP 方法、URL 以及认证资格（如果有的话）。
- 之前调用 setRequestHeader() 时指定的请求头部（如果有的话）。
- 传递给这个方法的 *body* 参数。



### setRequestHeader()

向一个==打开但未发送==的请求设置或者添加一个HTTP请求。

```javascript
setRequestHeader(name, value)
```

- name 参数是要设置的头部的名称。这个参数不应该包括空白、冒号或换行。
- value 参数是头部的值。这个参数不应该包括换行。

#### 说明

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

