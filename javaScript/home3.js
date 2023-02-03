// ========右上漢堡縮圖效果========
function navSwitch() {
    var hamburg = document.getElementById("hamburg");
    var switchLi = document.getElementById("switchLi");
    var isShow = true;

    hamburg.onclick = function() {
        isShow = !isShow;
        switchLi.style.display = isShow ? 'block' : 'none';
    };
};

// ==========歡迎台灣的DIV==========
function welcomeDiv() {
    var divTag = document.createElement('div'); //建立div標籤
    var tagContent = document.createTextNode('Welcome To Taiwan');
    divTag.id = 'welcome'; //替div加入一個id的屬性.並給值
    divTag.appendChild(tagContent); //把剛建立的字串塞進div
    document.body.appendChild(divTag); //把div標籤塞到body下
};

var tripName = [];
var tripPic = [];
var showpreset = 0;

// ========建立全部DIV========
function presetDiv() {
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json")
        .then(function(data) {
            return data.json();
        })
        .then(function(data) {
            for (let PD = showpreset; PD < showpreset + 8; PD++) {
                tripName.push(data.result.results[PD].stitle); //景點name
                tripPic.push(data.result.results[PD].file.split('http://')[1]) //景點照片
                var divTag = document.createElement('div'); //建立div標籤
                var imgTag = document.createElement('img'); //建立img標籤
                var h6Tag = document.createElement('h6'); //建立h6標籤
                var h6name = document.createTextNode(tripName[PD]); //景點名稱文字放入h6標籤
                imgTag.src = "https://" + tripPic[PD]; //以https://作為分割
                divTag.appendChild(h6name); //把文字內容放到h6
                h6Tag.appendChild(h6name); //把文字內容放到h6
                divTag.appendChild(imgTag); //把img的標籤塞進div
                divTag.append(h6Tag); //把h6的標籤塞進div
                divTag.className = 'stills'; //替div加入一個class的屬性.並給值
                h6Tag.className = 'name'; //替h6加入一個class的屬性.並給值
                document.getElementsByTagName('main')[0].append(divTag);
            }
        })
}

// ========按更多========
function morDiv() {
    showpreset = showpreset + 8
    presetDiv()
}