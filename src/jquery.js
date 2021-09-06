window.$ = window.jQuery = function (selectorOrArray) {
    let elements

    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    const api = Object.create(jQuery.prototype)//创建一个对象，这个对象的__proto__为jQuery.prototype
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })
    return api



    // return api //返回一个可以操作elements的对象
};
jQuery.prototype = {
    Constructor: jQuery,
    jquery: true,
    //elements: elements,
    find(selectorOrArray) {
        let array = []
        for (let i = 0; i < elements.length; i++) {
            let elements2 = Array.from(this.elements[i].querySelectorAll(selectorOrArray))
            array = array.concat(elements2)
        }
        array.oldApi = this //this就是旧的api
        return jQuery(array)//为了得到一个新的api对象，操作不同的elements元素，防止相互污染
    },

    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)//剩余展开操作符https://segmentfault.com/a/1190000016571785
            //相当于array.push(node.children[0],node.children[1],node.children[2]...)
            //形式为(...变量名)，将一个不定数量的参数表示为一个数组。
            //用于获取函数实参中的多余参数，组成一个数组
        })
        return jQuery(array)
    },
    print() {
        console.log(this.elements)
    },
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this//保证了链式操作 this就是api  当obj.fn()时,this就是obj
    },

    end() {
        return this.oldApi
    },
}
