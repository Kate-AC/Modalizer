# Modalizer

* 使用方法  
コードを見て頂ければいたって簡単です。  
  
html側（例）  
```html
<button id="buttonA">ボタン</button>
```
  
javascript側（例）
```javascript
var body = ''
  + '<div>'
    + '<div>ボディ</div>'
    + '<div>'
    + '<div style="width: 100%; height: 300px; background-color: #cccccc;"></div>'
      + '<button>ぼたん</button>'
    + '</div>'
  + '</div>';

//柔軟性を持たせるためにタグをそのまま入れることができるようにしています
var modalizerA = new Modalizer({
  'target': document.getElementById('buttonA'), //モーダルを開始させたい要素
  'header': '<span>ページタイトルA</span>',
  'body': body,
  'footer': '<button style="position: absolute; right: 10px; bottom: 8px;">何かしらのボタン</button>'
});

//各タイミングでコールバックを設定できます
modalizerA.
  modalOpen(function () {
    window.alert('モーダル開始時');
  }).
  modalOpened(function () {
    window.alert('モーダル開始後');
  }).
  modalClose(function () {
    window.alert('モーダル終了時');
  }).
  modalClosed(function () {
    window.alert('モーダル終了後');
  });
```
