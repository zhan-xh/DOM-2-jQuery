const api = jQuery(".test")//不反悔元素们，返回api对象
api.addClass('red')
    .addClass('blue')
    .addClass('green')//因为api.addClass('red')返回的是api(一个对象),所以就还可以对api.addClass('red')进行点操作
//这就是链式操作