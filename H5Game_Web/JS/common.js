//文字，图片等等比缩放
$(function () {
    initpage();
    $(window).resize(function () {
        initpage();
    })

    function initpage() {
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
        var _html = document.getElementsByTagName('html')[0];
        view_width > 1020 ? _html.style.fontSize = 1020 * 4.5 / 14 + 'px' : _html.style.fontSize = view_width * 4.5 / 14 + 'px';
    }
    var listPanel = $("#hideList").val();
    if (listPanel == "listPanle") {
        calculatorListH();
    }

});

//计算排行榜滚动高度
function calculatorListH() {
    var headerH = document.getElementById("header").clientHeight;
    var footerH = document.getElementById("footer").clientHeight;
    var listH = document.getElementById("listContainer").clientHeight;
    var docH = window.outerHeight;

    window.addEventListener('resize', function (event) {
        headerH = document.getElementById("header").clientHeight;
        footerH = document.getElementById("footer").clientHeight;
        listH = document.getElementById("listContainer").clientHeight;
        docH = window.outerHeight;
    });
    //console.log("顶部高度：" + headerH + "，横条高度：" + listH + "，底部高度：" + footerH + "，整个文档高度" + docH);
    var contentH = (docH - headerH - 20 - footerH) + "px";
    $("#ListContent").css("height", contentH);

}

//显示信息块，添加遮罩层
function ShowPanel(str) {
    var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + headerH + "px";
    //alert(document.body.clientHeight);
    hideBg.style.marginTop = headerH + "px";
    var showContainer = document.getElementById(str);
    showContainer.style.display = "block";
    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpen();

}

//关闭信息块
function ClosePanel(str) {
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "none";
    var showContainer = document.getElementById(str);
    showContainer.style.display = "none";
    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').beforeClose();
    if (str == 'QuestionType') {
        hideButton(str);
    }
}

//关闭功能点
function CloseFunc(str) {
    var isClose = $("." + str + " span").hasClass("lcircle");
    if (isClose) {
        $("." + str + " span").removeClass("lcircle");
        $("." + str).css("background-color", "#4584e8");
    } else {
        $("." + str + " span").addClass("lcircle");
        $("." + str).css("background-color", "#a9afb7");
    }

}

//弹出遮罩层，固定背景不能滚动
function ModalHelper(bodyCls) {
    var sTop;
    return {
        afterOpen: function () {
            sTop = document.scrollingElement.scrollTop;
            //console.log(document.scrollingElement.scrollTop);
            document.body.classList.add(bodyCls);
            document.body.style.top = -sTop + 'px';
        },
        beforeClose: function () {
            document.body.classList.remove(bodyCls);
            //scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = sTop;
        },
        afterOpenFixed: function () {
            document.body.classList.add(bodyCls);
            document.scrollingElement.scrollTop = sTop;
        }
    };
};

//显示不同版块
function showDiffPanel(obj) {
    var panelId = obj.id;
    var panelIdList = ['worldList', 'preCompet', 'friendList', 'examListNav', 'passListNav', 'failListNav'];
    var panelContent = ['competList', 'footListDiv', 'title', 'preCompetList', 'footPreListDiv', 'preTitle'];
    for (var i = 0; i < panelIdList.length; i++) {
        if (panelId == panelIdList[i]) {
            $("#" + panelId).addClass("currentList");
            if (panelId.indexOf("Nav") < 0) {
                for (var j = 0; j < panelContent.length; j++) {
                    //console.log(panelId.indexOf("pre"));
                    if (panelId.indexOf("pre") < 0 && (panelContent[j].indexOf("pre") < 0 && panelContent[j].indexOf("Pre") < 0)) {
                        $("#" + panelContent[j]).show();
                    } else if (panelId.indexOf("pre") >= 0 && (panelContent[j].indexOf("pre") >= 0 || panelContent[j].indexOf("Pre") >= 0)) {
                        $("#" + panelContent[j]).show();
                    } else {
                        $("#" + panelContent[j]).hide();
                    }
                }
            }
        }
        else {
            $("#" + panelIdList[i]).removeClass("currentList");
        }

        if (panelId.indexOf("Nav") >= 0 && panelId == panelIdList[i]) {
            var contId = panelId.substring(0, panelId.indexOf("Nav"));
            //console.log(contId);
            $("#" + contId).show();
        } else {
            var contId = panelIdList[i].substr(0, panelId.indexOf("Nav"));
            $("#" + contId).hide();
        }
    }
}

//显示题目分类
function showQuesitionType(obj) {
    var typeId = obj.id;
    var secChild = obj.children[1].innerText;//获取当前类别的文本信息
    var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = window.innerHeight + "px";
    hideBg.style.marginTop = headerH + "px";

    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpen();

    $("#QuestionType").show();
    $("#QuestionType .setImg").attr("class", "setImg");
    $("#QuestionType .setImg").addClass(typeId + "Bg");
    $("#QuestionType .subImg").attr("class", "subImg");
    $("#QuestionType .subImg").addClass(typeId + "Bg");
    $("#QuestionType img").attr('src', '../Imgs/' + typeId + '.png');
    $("#QuestionType .typeWords").text(secChild);


    switch (typeId) {
        case "wk":
            $("#QuestionType img").attr('src', '../Imgs/' + typeId + '.png');
            $("#friendList").removeClass("currentList");
            break;
        case "preCompet":
            $("#competList").hide();
            $("#preCompetList").show();
            $("#footListDiv").hide();
            $("#footPreListDiv").show();
            $("#preTitle").show();
            $("#title").hide();
            break;
            //default:
            //    $("#friendList").addClass("currentList");
            //    $("#worldList").removeClass("currentList");
            //    $("#competList").show();
            //    $("#footListDiv").show();
            //    $("#footPreListDiv").hide();
            //    $("#preCompetList").hide();
            //    $("#preTitle").hide();
            //    $("#title").show();
            //    break;
    }
}
//设置题目
function SetQuestion(obj) {
    var secChild = obj.children[0].innerText;//获取当前类别的文本信息

    $("#next").show();
    $(obj.children[1]).addClass("animationPlus");
}
//设置题目分类中二级分类点击的按钮
function hideButton(str) {
    $("#next").hide();
    $("#" + str + " .subDiv .subImg").removeClass("animationPlus");
}
//显示提示信息，确认是否修改
function checkData() {
    $("#CheckDiv").show();
    var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + "px";
    hideBg.style.marginTop = headerH + "px";
    //console.log(document.body.clientHeight);
    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpen();
}
//提交设置的题目信息，确认是否修改
function submitQuestion() {
    var qContent = $("#qContent").val();
    var trueA = $("#trueA").val();
    var falseA1 = $("#falseA1").val();
    var falseA2 = $("#falseA2").val();
    var falseA3 = $("#falseA3").val();
    var flag = true;
    var rs = confirm("问题：" + qContent + "，正确答案：" + trueA + "，错误答案：" + falseA1 + "，" + falseA2 + "，" + falseA3);
    if (qContent == "" || qContent == null) {
        flag = false;
    }
    $("#result").show();
    $("#CheckDiv").hide();

    if (!flag && rs) {
        $("#result .submitRs").text("提交失败");
        $("#result .explain").text("题库中已经有这道题目了！");
        $("#result a").attr("href", "javascript:$('#result').hide();ClosePanel('CheckDiv');");
    }

}
//显示提交的结果
function showSubmitResult() {
    $("#result").hide();
    window.location.href = '../View/MyQuestion.html';
}

//获取浏览器地址栏参数
function getUrlParam(url, name) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(url);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

//提交审题答案
function submitAnswer(obj) {
    var currentAnswer = obj.innerText;
    var currentId = obj.id;
    //alert(currentId);
    $(obj).addClass("currentA");
    $("#qSkip").hide();
    setTimeout("isTrue(" + currentId + ",'" + currentAnswer + "')", 500);
    //isTrue(obj, currentAnswer)
}
//判题
function isTrue(id, answer) {
    //设置正确答案
    var trueA = "答案C";
    var trueAId = "answerC";
    var trueHtml = '<span class="trueMark"></span>';
    var falseHtml = '<span class="falseMark"><span class="splitLineL"></span><span class="splitLineR rotateBox"></span></span>';
    if (answer == trueA) {
        $(id).removeClass("currentA");
        $(id).before(trueHtml);
        $(id).addClass("trueA");
    } else {
        $(id).removeClass("currentA");
        $(id).before(falseHtml);
        $(id).addClass("falseA");
        $("#answerC").before(trueHtml);
        $("#answerC").addClass("trueA");
    }
    setTimeout("judgeQuestion()", 2000);
}

//判断该题目是否有价值
function judgeQuestion() {
    $("#answer").hide();
    $("#judge").show();
}

//加载下一题
function loadingNextQ() {
    alert("加载下一题！");
    window.location.href = "../View/ExaminingQuestion.html";
}

//不应该通过审核的原因
function showReason() {
    $("main.examPage").hide();
    $("#reason").show();
}

//显示题目分类
function showWinPro(obj) {
    var typeId = obj.id;
    var secChild = obj.children[0].innerText;//获取当前类别的文本信息
    var headerH = document.getElementById("header").offsetHeight;
    var footerH = document.getElementById("footer").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + headerH + footerH + "px";
    hideBg.style.marginTop = headerH + "px";

    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpen();

    $("#ProInfoPanel").show();
    //$("#ProInfoPanel .setImg").attr("class", "setImg");
    //$("#ProInfoPanel .setImg").addClass(typeId + "Bg");
    //$("#ProInfoPanel .setImg").attr("class", "subImg");
    //$("#ProInfoPanel .subImg").addClass(typeId + "Bg");
    $("#ProInfoPanel .setImg img").attr('src', '../Imgs/' + typeId + '.png');
    $("#ProInfoPanel .winProName").text(secChild);

}


//双人PK显示动画
function showPKInfo() {
    $("#startInfo").hide();
    $("div.loading").hide();
    $("#PKInfo").show();
    var quesNum = $("#currentQuesNum").text();

    loadingNext(quesNum);
    //调用倒计时方法
    setTimeout(function () {
        setTenSeconds()
    }, 1000)

}

var countdown = 10;
var currentObj;
var currentUserId = 2018001;
var successAnsCount = new Array();
var answerList = [
    { id: "1", answer: "aA" }, { id: "2", answer: "aC" }, { id: "3", answer: "aD" }, { id: "4", answer: "aA" }, { id: "5", answer: "aB" },
    { id: "6", answer: "aC" }, { id: "7", answer: "aD" }, { id: "8", answer: "aB" }, { id: "9", answer: "aB" }, { id: "10", answer: "aC" },
    { id: "11", answer: "aB" }, { id: "12", answer: "aB" }];
var questionList = [
    { id: 1, question: "成语“沉鱼落雁”描述的是哪两位古代美女？", answer: [{ aA: "西施和王昭君", aB: "西施和杨玉环", aC: "王昭君和貂蝉", aD: "貂蝉和杨玉环" }] },
    { id: 2, question: "上古十大神器不包含下列哪个？", answer: [{ aA: "神农鼎", aB: "女娲石", aC: "干将", aD: "轩辕剑" }] },
    { id: 3, question: "中国五岳名山中不包含下列哪座山？", answer: [{ aA: "衡山", aB: "泰山", aC: "嵩山", aD: "黄山" }] },
    { id: 4, question: "中国最大的咸水湖？", answer: [{ aA: "青海湖", aB: "鄱阳湖", aC: "洞庭湖", aD: "太湖" }] },
    { id: 5, question: "西游记中的五指山在哪儿？", answer: [{ aA: "新疆", aB: "海南", aC: "安徽", aD: "湖北" }] },
    { id: 6, question: "歼20战机属于我国第几代战机？", answer: [{ aA: "第三代", aB: "第四代", aC: "第五代", aD: "第六代" }] },
    { id: 7, question: "上古十大魔神中不包含下列哪位？", answer: [{ aA: "蚩尤", aB: "共工", aC: "银灵子", aD: "后羿" }] },
    { id: 8, question: "中国最大的淡水湖？", answer: [{ aA: "青海湖", aB: "鄱阳湖", aC: "洞庭湖", aD: "太湖" }] },
    { id: 9, question: "成语“三山五岳”中“三山”包含下列哪座山？", answer: [{ aA: "衡山", aB: "雁荡山", aC: "峨眉山", aD: "恒山" }] },
    { id: 10, question: "我国哪位著名女歌唱家在1990年春晚上首次演唱民歌《小背篓》？", answer: [{ aA: "李谷一", aB: "雷佳", aC: "宋祖英", aD: "梦鸽" }] },
    { id: 11, question: "洛神赋的作者是？", answer: [{ aA: "曹丕", aB: "曹植", aC: "顾恺之", aD: "曹操" }] },
    { id: 12, question: "上古十大神兽不包含下列哪两个？", answer: [{ aA: "饕餮和毕方", aB: "青龙和白虎", aC: "麒麟和凤凰", aD: "重明鸟和白泽" }] }
];
//设计双人PK时10秒倒计时 
function setCountDown() {
    var quesNum = $("#currentQuesNum").text();
    if (parseInt(quesNum) > 1 && parseInt(quesNum) <= questionList.length) {
        countdown = 10;
        setTenSeconds();
    }

}
//倒计时
function setTenSeconds() {
    var t;
    var timer = document.getElementById("timerText");
    $("#timer").css("display", "inline-block");
    var quesNum = $("#currentQuesNum").text();

    if (countdown == 0) {
        autoJudgeAnswer(currentObj, quesNum);
        currentObj = null;
        countdown = 10;
        clearTimeout(t);
        return;
    } else {
        timer.innerText = countdown;
        countdown--;
    }
    t = setTimeout(function () {
        setTenSeconds()
    }, 1000)
}

//提交答案
function submitPKAnswer(obj) {
    var currentAnswer = obj.innerText;
    var currentId = obj.id;
    currentObj = obj;
    $(obj).addClass("currentA");
    //setTimeout("judgeAnswer(" + currentId + ",'" + currentAnswer + "')", 500);
}

//自动获取双方答案
function autoJudgeAnswer(obj, qNum) {
    if (obj == null || obj == "" || obj == undefined || obj.message == 'obj is not defined') {
        loadingNext(qNum);
    } else {
        //var currentAnswer = obj.innerText;
        var currentId = obj.id;
        //alert(currentId);
        $(obj).addClass("currentA");
        setTimeout("judgeAnswer(" + currentId + ",'" + qNum + "')", 500);
    }
}

//判断答案
function judgeAnswer(currentObj, currentQNum) {
    //设置正确答案
    var totalH = $("#leftScore div.scoreBar").height();
    var quesCount = questionList.length;
    var currentH = totalH / quesCount;
    var currentId = currentObj.id;
    var trueHtml = '<span class="trueMark"></span>';
    var falseHtml = '<span class="falseMark"><span class="splitLineL"></span><span class="splitLineR rotateBox"></span></span>';
    var lH = $("#lscoreBar").outerHeight();
    var rH = $("#rscoreBar").outerHeight();
    lH = lH + currentH;
    for (var i = 0; i < answerList.length ; i++) {
        if (currentQNum == answerList[i].id) {
            if (currentId == answerList[i].answer) {
                $(currentId).removeClass("currentA");
                $(currentId).before(trueHtml);
                $(currentId).addClass("trueA");
                $("#lscoreBar").css("height", lH + "px");
                $("#lscore").text(parseInt(lH) + "分");
                $("#rsLscore").text(parseInt(lH) + "分");
                successAnsCount.push(currentId);
            } else {
                $(currentId).removeClass("currentA");
                $(currentId).before(falseHtml);
                $(currentId).addClass("falseA");
                $("#" + answerList[i].answer).before(trueHtml);
                $("#" + answerList[i].answer).addClass("trueA");
            }
        }
    }
    setTimeout("loadingNext(" + currentQNum + ")", 500);
}

//加载下一题
function loadingNext(num) {
    var qNum = parseInt(num);
    // console.log("qNum"+qNum+"，num："+num);
    //12题答完时最终显示的信息
    if (qNum == answerList.length) {
        $("#PKQuestion").hide();
        $("#leftScore").hide();
        $("#timer").hide();
        $("#rightScore").hide();
        $("#PKResult").show();
        if (successAnsCount.length > 5) {
            $("#pkSuccess").show();
            $("#pkFail").hide();
        } else {
            $("#pkFail").show();
            $("#pkSuccess").hide();
        }
    } else {
        $("#QuesContent div.answer .aDiv span").removeClass("trueA");
        $("#QuesContent div.answer .aDiv span").removeClass("falseA");
        $("#QuesContent div.answer .aDiv span").removeClass("currentA");
        qNum++;
        for (var j = 0; j < questionList.length ; j++) {
            if (qNum == questionList[j].id) {
                $("#QuesContent div.question").text(questionList[j].question);
                for (var m = 0; m < questionList[j].answer.length; m++) {
                    $("#QuesContent div.answer #aA").text(questionList[j].answer[m].aA);
                    $("#QuesContent div.answer #aB").text(questionList[j].answer[m].aB);
                    $("#QuesContent div.answer #aC").text(questionList[j].answer[m].aC);
                    $("#QuesContent div.answer #aD").text(questionList[j].answer[m].aD);
                }
                $("#currentQuesNum").text(qNum);
                setCountDown();
            }
        }

    }
}

var interval = 3 * 60 * 60 * 1000;
var clock;
var timeLimitB, timeLimitE;
//设计3小时倒计时 
function getClock() {
    displayTime();
    clock = setInterval(displayTime, 1000);
}

//显示时间：
function displayTime() {
    if (parseInt(interval, 10) <= 0) {
        clearInterval(clock);
        $("#clock").text('金币已满！');
    }
    else {
        interval = interval - 1000;
        //还剩X天X小时X分X秒 
        $("#clock").html(MillisecondToDate(interval));
        $("#bankTimer").html(MillisecondToDate(interval));
        // console.log(new Date().toLocaleTimeString());
    }
}
//毫秒转换为时间：
function MillisecondToDate(msd) {
    var time = parseFloat(msd, 10) / 1000;  //毫秒转换为秒
    if (null != time && "" != time) {
        if (time > 24 * 3600) {  //大于一天
            var dayStr = GetFormatDateStr(parseInt(time / (24 * 3600), 10));
            //除去天数剩余的秒
            var seconds = parseInt(time % (24 * 3600), 10);
            var hourStr = GetFormatDateStr(parseInt(seconds / 3600, 10));
            var minStr = GetFormatDateStr(parseInt((seconds % 3600) / 60, 10));
            var secondStr = GetFormatDateStr(parseInt((seconds % 3600) % 60, 10));
            time = "还剩" + dayStr + "天" + hourStr + "小时" + minStr + "分" + secondStr + "秒";
        }
        else if ((time > 3600) && (time <= 24 * 3600)) {  //如果大于1小时小于1天
            var hourStr = GetFormatDateStr(parseInt(time / 3600, 10));
            var minStr = GetFormatDateStr(parseInt((time % 3600) / 60, 10));
            var secondStr = GetFormatDateStr(parseInt((time % 3600) % 60, 10));
            time = hourStr + ":" + minStr + ":" + secondStr;
        }
        else if (time > 60 && time <= 3600) {  //如果大于1分钟小于等于1小时
            var minStr = GetFormatDateStr(parseInt(time / 60, 10));//"09"
            var secondStr = GetFormatDateStr(parseInt(time % 60, 10));//"09"
            time = "00:00:" + minStr + ":" + secondStr;
        }
        else {  //如果小于1分钟
            var secondStr = GetFormatDateStr(parseInt(time, 10));//"09"

            time = "00:00:00:" + secondStr;
        }
    }
    return time;
}
//将分和秒进行格式化返回字符串
function GetFormatDateStr(date) {
    if ((date + "").length <= 1) {
        return "0" + date;
    }
    return date + "";
}

//设置银行获取金币提示信息
function showMoneyInfo(str) {
    var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + "px";
    hideBg.style.marginTop = headerH + "px";
    var showContainer = document.getElementById(str);
    showContainer.style.display = "block";
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var clockTime = $("#clock").text();
    var currentTime = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day) + ' ' + clockTime;
    var currentTime2 = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day) + ' ' + '00:00:00';
    var currentClock = transformDate(currentTime, currentTime2);

    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpenFixed();

    if (parseInt(currentClock, 10) > 0) {
        $("#getFail").show();
        $("#getSuccess").hide();
        $("#closeBtn").attr("onclick", "javascript: ClosePanel('" + str + "');");
    } else {
        $("#getSuccess").show();
        $("#getFail").hide();
        $("#closeBtn").attr("onclick", "javascript:window.location.href='../View/Index.html'");
    }
}

//时间格式转换
function transformDate(time, time2) {
    var transformTime, t2 = '';
    //根据浏览器类型调用不同的方法主要区别火狐和别的浏览器
    if (navigator.userAgent.toLowerCase().indexOf("firefox") > 0) {
        //火狐
        var da = time.replace(/-/g, "/").split(/\/|\:|\ /);
        transformTime = new Date(da[0], da[1] - 1, da[2], da[3], da[4], da[5]);
        var da1 = time2.replace(/-/g, "/").split(/\/|\:|\ /);
        t2 = new Date(da1[0], da1[1] - 1, da1[2], da1[3], da1[4], da1[5]);
    }
    else if (navigator.userAgent.toLowerCase().indexOf("safari") > 0 || navigator.userAgent.toLowerCase().indexOf("mac") > 0 || navigator.userAgent.toLowerCase().indexOf("iphone") > 0 || navigator.userAgent.toLowerCase().indexOf("mac os") > 0) {
        //苹果浏览器 
        //修改说明：该判断只能判断是否包含mac或其他字符，符合这种条件的有Chrome（谷歌）浏览器，Safari不支持,添加判断safari 
        var da = time.replace(/-/g, "/").split(/\/|\:|\ /);
        transformTime = new Date(da[0], da[1] - 1, da[2], da[3], da[4], da[5]);
        var da1 = time2.replace(/-/g, "/").split(/\/|\:|\ /);
        t2 = new Date(da1[0], da1[1] - 1, da1[2], da1[3], da1[4], da1[5]);
    }

    else {
        //注意：new Date()方法在IE中不兼容日期格式为"2014-11-28 14:22:33"这类格式，必须要去掉'-'才可以
        transformTime = new Date(time.replace(/-/, "/")).getTime();// dateStr.replace(/\s/g, 'T').replace(/\//g, '-'); 
        t2 = new Date(time2.replace(/-/, "/")).getTime();// dateStr.replace(/\s/g, 'T').replace(/\//g, '-'); 

    }
    return transformTime - t2;
}

//显示知识进化的科目分类
function showKnowledgePro(obj) {
    var typeId = obj.id;
    typeId = typeId.substring(0, typeId.indexOf("_"));
    var secChild = obj.children[0].innerText;//获取当前类别的文本信息
    var lastLevel = obj.children[2].innerText;
    var headerH = document.getElementById("header").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + "px";
    hideBg.style.marginTop = headerH + "px";

    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpenFixed();

    $("#KnowledgePanel").show();
    $("#KnowledgePanel .setImg img").attr('src', '../Imgs/' + typeId.toLocaleLowerCase() + '.png');
    $("#KnowledgePanel .setImg").addClass("knowledgeBgColor" + typeId);
    $("#KnowledgePanel .winProName").text(secChild);
    $("#KnowledgePanel .proLevel").text(lastLevel);

}

//显示购买的物品信息
function showBuyPanel(obj) {
    var typeId = obj.id;
    var secChild = obj.children[0].innerText;//获取当前物品的文本信息
    var money = obj.children[2].innerText;//获取当前物品的文本信息
    var virtualMoney = 60000;

    var headerH = document.getElementById("header").offsetHeight;
    var footerH = document.getElementById("footer").offsetHeight;
    var hideBg = document.getElementById("hideBg");
    hideBg.style.display = "block";
    hideBg.style.height = document.body.clientHeight + headerH + footerH + "px";
    hideBg.style.marginTop = headerH + "px";

    var proIntroHtml = '<span>花费<span>' + money + '</span>元购买<span>' + secChild + '</span>，立即获得<span>' + virtualMoney + '</span>金币</span>';

    //设置背景固定，不能滚动，且当前位置固定。
    ModalHelper('modal-open').afterOpen();

    $("#BuyProDiv").show();
    //$("#ProInfoPanel .setImg").attr("class", "setImg");
    //$("#ProInfoPanel .setImg").addClass(typeId + "Bg");
    //$("#ProInfoPanel .setImg").attr("class", "subImg");
    //$("#ProInfoPanel .subImg").addClass(typeId + "Bg");
    $("#BuyProDiv .setImg img").attr('src', '../Imgs/' + typeId + '.png');
    $("#BuyProDiv .winProName").text(secChild);
    $("#BuyProDiv .proIntro").html(proIntroHtml);
}











