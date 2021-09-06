window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }

    return {

        find(selectorOrArray) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                let elements2 = Array.from(elements[i].querySelectorAll(selectorOrArray))
                array = array.concat(elements2)
            }
            array.oldApi = this //this就是旧的api
            return jQuery(array)//为了得到一个新的api对象，操作不同的elements元素，防止相互污染
        },
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
            }
            return this
        },
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this//保证了链式操作 this就是api  当obj.fn()时,this就是obj
        },
        oldApi: selectorOrArray.oldApi,
        end() {
            return this.oldApi
        },
    }
    // return api //返回一个可以操作elements的对象
}