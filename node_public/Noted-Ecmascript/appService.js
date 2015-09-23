angular.module("appTranslate")
.service("service",function(){
    this.translateItem = function(wTotranslate){
        keyTran  = 'trnsl.1.1.20150917T145626Z.f8b4963111e4dbb9.fb04e6d38874dec7b8c7fd81a16d64c677caaad7';
        function translateAjaxCall(key, message, language) {
            var temp = null;
            $.ajax({
                'async': false,
                'dataType': 'JSON',
                'url': 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key + '&lang=' + language + '&text=' + message,
                'success': function (data) {
                    //console.log(data.text[0]);
                    temp = data.text[0];
                }
            });
            return temp;
        }

        var ajaxReturn = translateAjaxCall(keyTran, wTotranslate.message, wTotranslate.language);
        wTotranslate.result = ajaxReturn;
        //console.log(wTotranslate);
        console.log('Translation Done: ' + ajaxReturn);
        return wTotranslate;
    };
});