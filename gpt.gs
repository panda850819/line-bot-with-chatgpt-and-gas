function requestGPT3Api(text) {
  var root = 'https://api.openai.com/v1/completions';
  // 請將下方的 [輸入ChatGPT API Key] 連括號一起刪除並取代成 ChatGPT API Key
  var params = {
    'headers': {'Authorization': 'Bearer [輸入ChatGPT API Key]  '},
    "muteHttpExceptions": true,
    'payload': JSON.stringify({"model": "text-davinci-003","prompt": text,"max_tokens": 4000}),
    'contentType': 'application/json',
    'method': 'post',
  };
  var response = UrlFetchApp.fetch(root, params);
  var data = response.getContentText();
  var json = JSON.parse(data);
  Logger.log(json);
  return json.choices[0].text
}