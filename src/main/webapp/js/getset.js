/**
 *
 * 包含功能：
 * 1、通过Id、Class、DOM名称获取对象；
 * 2、获取和设置DOM对象的文本值；
 * 3、获取和设置DOM对象的属性值；
 * 4、获取和设置DOM对象的文本颜色；
 * 5、获取和设置DOM对象的背景颜色；
 * 6、获取和设置DOM对象的边框颜色；
 * 7、为DOM对象添加类、移除类、判断是否含有某个类
 * 8、复选框全选、全不选、反转选中、判断至少选中个数
 *
 */

//根据ID、Class、Name获取DOM对象
function getDocument(obj) {
    var prefix = obj.substring(0, 1);
    var realValue = obj.substr(1);
    if ("#" == prefix) {
        return document.getElementById(realValue);
    } else if ("." == prefix) {
        return document.getElementsByClassName(realValue);
    } else {
        return document.getElementsByName(obj);
    }
}

//设置文本框一类的对象的内容
function setVal(obj, val) {
    getDocument(obj).value = val;
}

//获取文本框一类的对象的内容
function getVal(obj) {
    return getDocument(obj).value;
}

//设置DIV一类的对象的内容
function setHtml(obj, val) {
    getDocument(obj).innerHTML = val;
}

//获取DIV一类的对象的内容
function getHtml(obj) {
    return getDocument(obj).innerHTML;
}

//设置DOM对象属性的值
function setAttr(obj, attr, val) {
    getDocument(obj).setAttribute(attr, val);
}

//获取DOM对象属性的值
function getAttr(obj, attr) {
    return getDocument(obj).getAttribute(attr);
}

//设置DOM对象的颜色
function setColor(obj, color) {
    getDocument(obj).style.color = color;
}

//获取DOM对象的颜色
function getColor(obj, color) {
    return getDocument(obj).style.color;
}

//设置DOM对象背景颜色
function setBgColor(obj, color) {
    getDocument(obj).style.backgroundColor = color;
}

//获取DOM对象的背景颜色
function getBgColor(obj, color) {
    return getDocument(obj).style.backgroundColor;
}

//添加类
function addClass(obj, className) {
    getDocument(obj).classList.add(className);
}

//移除类
function removeClass(obj, className) {
    getDocument(obj).classList.remove(className);
}

//判断DOM对象中是否有某个类(只能用ID和class获取的DOM对象)
function checkClass(obj, className) {
    var prefix = obj.substring(0, 1);
    if ("." == prefix) {
        return getDocument(obj)[0].classList.contains(className);
    }
    return getDocument(obj).classList.contains(className);
}

//设置DOM对象边框的颜色
function setBorderColor(obj, color) {
    getDocument(obj).style.borderColor = color;
}

//获取DOM对象边框的颜色
function getBorderColor(obj) {
    return getDocument(obj).style.borderColor;
}

//复选框全部选中
function checkBoxSelectAll(name) {
    var dom = getDocument(name);
    for (var i = 0; i < dom.length; i++) {
        dom[i].checked = true;
    }
}

//复选框全不选中
function checkBoxSelectNone(name) {
    var dom = getDocument(name);
    for (var i = 0; i < dom.length; i++) {
        dom[i].checked = false;
    }
}

//复选框反选
function checkBoxSelectInvert(name) {
    var dom = getDocument(name);
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].checked) {
            dom[i].checked = false;
        } else {
            dom[i].checked = true;
        }
    }
}

//复选框至少有n个是选中的
function checkSelectN(name, num) {
    var dom = getDocument(name);
    var flag = 0; //标记选中的数量
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].checked) {
            flag++;
        }
    }
    if (flag >= num) {
        return true;
    }
    return false;
}

//获取所有被选中的复选框的值
function checkBoxVals(name) {
    var dom = getDocument(name);
    var arr = new Array();
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].checked) {
            arr.push(dom[i].value);
        }
    }
    return arr;
}

//获取被选中单选框的值
function radioVal(name){
    var dom = getDocument(name);
    for (var i = 0; i < dom.length; i++) {
        if (dom[i].checked) {
            return dom[i].value;
        }
    }
}