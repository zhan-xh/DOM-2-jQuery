window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this//保证了链式操作 this就是api  当obj.fn()时,this就是obj
        },
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                let elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            return array
        }
    }
    // return api //返回一个可以操作elements的对象
}