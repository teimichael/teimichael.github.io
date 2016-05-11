
(function($, udf) {
    var ns = ".inputEvent ",
        dataBnd = "bound.inputEvent",
        dataVal = "value.inputEvent",
        dataDlg = "delegated.inputEvent",

        // input.inputEvent textInput.inputEvent propertychange.inputEvent paste.inputEvent cut.inputEvent keydown.inputEvent keyup.inputEvent drop.inputEvent 
        bindTo = ["input","textInput","propertychange","paste","cut","keydown", "keyup","drop",""].join(ns),
        
        // focusin.inputEvent mouseover.inputEvent dragstart.inputEvent input.inputEvent textInput.inputEvent propertychange.inputEvent paste.inputEvent cut.inputEvent keydown.inputEvent keyup.inputEvent drop.inputEvent
        dlgtTo = [ "focusin", "mouseover", "dragstart", "" ].join(ns) + bindTo,

        // TEXTAREA 和 INPUT
        supported = {TEXTAREA:udf, INPUT:udf},
        
        // 事件被触发 在 input value 更新之前
        delay = { paste:udf, cut:udf, keydown:udf, drop:udf, textInput:udf };

    // 检测TEXTAREA、 INPUT、contentEditable属性
    function isSupported(elem) {
        return $(elem).prop('contenteditable') == "true" ||
                 elem.tagName in supported;
    };

    $.event.special.txtinput = {
        setup: function(data, namespaces, handler, onChangeOnly) {
            var timer,
                bndCount,
                // 缓存本元素节点
                elem  = this,
                $elem = $(this),
                triggered = false;

            if (isSupported(elem)) {
                bndCount = $elem.data(dataBnd) || 0;

                if (!bndCount){
                    $elem.bind(bindTo, handler);
                }

                $elem.data(dataBnd, ++bndCount);//DOM节点属性缓存绑定的次数
                $elem.data(dataVal, elem.value);//DOM节点属性缓存
            } else {
                $elem.bind(dlgtTo, function (e) {
                    var target = e.target;
                    if (isSupported(target) && !$.data(elem, dataDlg)) {
                        bndCount = $.data(target, dataBnd) || 0;

                        if (!bndCount) {
                            $(target).bind(bindTo, handler);
                            handler.apply(this, arguments);
                        }

                        // make sure we increase the count only once for each bound ancestor
                        $.data(elem, dataDlg, true);
                        $.data(target, dataBnd, ++bndCount);
                        $.data(target, dataVal, target.value);
                    }
                });
            }
            function handler (e) {
                var elem = e.target;

                // Clear previous timers because we only need to know about 1 change
                window.clearTimeout(timer), timer = null;

                // Return if we've already triggered the event
                if (triggered)
                    return;

                // paste, cut, keydown and drop all fire before the value is updated
                if (e.type in delay && !timer) {
                    // ...so we need to delay them until after the event has fired
                    timer = window.setTimeout(function () {
                        if (elem.value !== $.data(elem, dataVal)) {
                            $(elem).trigger("txtinput");
                            $.data(elem, dataVal, elem.value);
                        }
                    }, 0);
                }
                else if (e.type == "propertychange") {
                    if (e.originalEvent.propertyName == "value") {
                        $(elem).trigger("txtinput");
                        $.data(elem, dataVal, elem.value);
                        triggered = true;
                        window.setTimeout(function () {
                            triggered = false;
                        }, 0);
                    }
                }
                else {
                    var change = onChangeOnly !== undefined ? onChangeOnly :
                        $.fn.input.settings.onChangeOnly;
                    if ($.data(elem, dataVal) == elem.value && change)
                        return;
                    
                    $(elem).trigger("txtinput");
                    $.data(elem, dataVal, elem.value);
                    triggered = true;
                    window.setTimeout(function () {
                        triggered = false;
                    }, 0);
                }
            }
        },
        teardown: function () {
            var elem = $(this);
            elem.unbind(dlgtTo);
            elem.find("input, textarea").addBack().each(function () {
                bndCount = $.data(this, dataBnd, ($.data(this, dataBnd) || 1)-1);

                if (!bndCount)
                    elem.unbind(bindTo);
            });
        }
    };

    // 设置jq input事件入口
    $.fn.input = function (handler) {
        /*
            与keypress不同的是，该事件只会在用户输入可视字符时触发，而keypres事件则只要按下键即触发(如CapsLock，Backspace)。 
            可看到textInput考虑的主要是字符，可以通过事件对象的data属性获取所输入字符。 
            目前只有IE9，Chrome，Safari支持。
         */
        return handler ? $(this).bind("txtinput", handler) : $(this).trigger("txtinput");
    }
    
    $.fn.input.settings = {
        onChangeOnly: false
    };
    
})(jQuery);