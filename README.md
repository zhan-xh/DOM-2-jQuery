# 利用jQuery 封装DOM
## 闭包&链式操作
解决git push时出现 fatal: unable to access 'https://github.com/zhan-xh/DOM-2-jQuery.git/': Failed to connect to github.com port 443: Timed out
问题
```
git config --global --unset http.proxy
git config --global --unset https.proxy

```
1. window.jQuery() 是我们提供的全局函数
jQuery()接受一个选择器,用来获取对应的元素,但他却不返回这些元素,相反,它返回一个对象,称为jQuery构造出来的对象,这个对象有一个方法可以操作对应的元素.
2. 在obj.fn()中的函数的this 就是obj
所以在jquery中的方法中,this就是那个对象
3. 链式操作
```javascript
api.addClass('red')
    .addClass('blue')
    .addClass('green')//因为api.addClass('red')返回的是api(一个对象),所以就还可以对api.addClass('red')进行点操作
//这就是链式操作
```
4. 闭包
即是函数可以访问外部的变量,在addClass方法中,访问了外部的元素elements
```javascript
window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this//保证了链式操作 this就是api  当obj.fn()时,this就是obj
        }
    }
    // return api //返回一个可以操作elements的对象
}

```