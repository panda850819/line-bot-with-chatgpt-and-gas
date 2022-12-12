function doPost(e) {
  // 定義變數
  var token = ''; // Line Channel Access Token，請在 '' 內填寫（要保留 ''）
  var url = 'https://api.line.me/v2/bot/message/reply';
  var eventData = JSON.parse(e.postData.contents).events[0];
  var replyToken = eventData.replyToken;
  var replyMessage = '';
  var messageText = eventData.message.text;
  var messageType = eventData.message.type;
  var keyword = '/help '; // 您可以更換任意的 keyword 以讓 LINEBot 了解並啟動

  // 如果訊息是 '/help ' 且訊息類型是 'text'，則呼叫 requestGPT3Api 並取得回傳值
  if (messageText.includes(keyword) && messageType == "text") {
    getMessage = requestGPT3Api(eventData.message.text);
    replyMessage = getMessage.slice(2).replace('\n\n\n','\n\n');
  }

  // 將回應放入 payload 中
  var payload = {
    'replyToken': replyToken,
    'messages': [{
        'type': 'text',
        'text': replyMessage
      }]
  };

  // 定義要傳送的選項
  var options = {
    'payload' : JSON.stringify(payload),
    'method'  : 'POST',
    'headers' : {"Authorization" : "Bearer " + token},
    'contentType' : 'application/json'
  };

  // 呼叫 API 並傳送資料
  UrlFetchApp.fetch(url, options);
}