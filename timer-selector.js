// Constants
var SECONDS_MS = 1000;
var MINUTES_MS = SECONDS_MS * 60;
var HOURS_MS = MINUTES_MS * 60;
var DAYS_MS = HOURS_MS * 24;

// Initialization errors are only in English unfortunately.
function setError(primary, secondary = null) {
  var errorElement = document.getElementById('error');
  errorElement.classList.remove('hidden');
  errorElement.innerText = primary;

  var formElement = document.getElementById('form');
  formElement.classList.add('hidden');

  if (secondary) {
    var secondaryErrorElement = document.createElement('div');
    secondaryErrorElement.classList = ['error-secondary'];
    secondaryErrorElement.innerText = secondary;
    errorElement.appendChild(secondaryErrorElement);
  }
}

// Localization
var TRANSLATIONS = {
  // Test _mostly_ returns the message key but there are a few special cases
  'test': {
    'template-deletion': 'score: %%score%%\n\nsummary:%%summary%%\n\niframe: %%iframe%%',
    'summary-deletion-reason-skeleton': '**(%%reason%%).**',
    'summary-deletion-reasons': ['1', '2', '3'],
  },

  // Simplified Chinese
  'zh-hans': {
    'timer-description': '此计时器将过期于：',
    'timer-progress': '此计时器将过期于：',
    'timer-finished': '此计时器已过期：',
    'timer-type': '计时器类型',
    'timer-type-generic': '通用',
    'timer-type-deletion': '删除',
    'timer-type-ban': '封禁',
    'timer-type-shield': '屏蔽',
    'deletion-options': '删除选项',
    'deletion-score': '当前文章的分数为',
    'summary-deletion-reasons': [],
    'duration': '运行时间',
    'duration-1d': '1日',
    'duration-1w': '1周',
    'duration-2w': '2周',
    'duration-1y': '1年',
    'duration-custom': '自定义',
    'unit-minute': '分钟',
    'unit-hour': '小时',
    'unit-day': '日',
    'unit-week': '周',
    'unit-month': '月',
    'unit-year': '年',
    'start-time': '开始时间',
    'start-time-now': '现在',
    'start-time-later': '稍后',
    'messages': '通知内容',
    'message-progress': '此计时器运行中（可选）',
    'message-finished': '此计时器已到期（可选）',
    'advanced-section': '高级设置',
    'height': '高度',
    'width': '宽度',
    'css-extra': '自定计时器样式（可选）',
    'template': '输出模板',
    'template-deletion': '本文章目前为%%score%%分，现依据[[[deletions-guide|删除指导]]]宣告将删除此页面：\n\n%%iframe%%\n\n请本文章作者尽快进行修改内容提高质量。\n如果该页面作者无法及时做出更改，其他人也可以在确认后向管理组申请重写。',
    'template-ban': '[[div class=\"blockquote\"]]\n**XXXX年XX月XX日：**网站成员[[*user USERNAME]]【违规行为】，根据以下规则和内容：\n【网站站规内容】\n\n将要对该网站成员进行封禁处分：\n%%iframe%%\n\n如果对此次处理结果有疑问，可以联系管理组。本次处分允许\\不允许申诉。\n[[/div]]',
    'template-shield': '[[div class=\"blockquote\"]]\n**XXXX年XX月XX日：**网站成员[[*user USERNAME]]【违规行为】，其滥用功能并根据以下规则和内容：\n【网站站规内容】\n\n将要对该网站成员进行限制讨论功能的处分：\n%%iframe%%\n\n如果对此次处理结果有疑问，可以联系管理组。本次处分允许\\不允许申诉。\n[[/div]]',
    'message-deletion-progress': '此页面将在以下时间后删除：',
    'message-deletion-finished': '此页面在以下时间前可删除：',
    'message-ban-progress': '此用户封禁将到期于：',
    'message-ban-finished': '此用户封禁已到期：',
    'message-shield-progress': '此讨论屏蔽将到期于：',
    'message-shield-finished': '此讨论屏蔽已到期：',
    'build-timer': '生成计时器',
    'build-and-copy-timer': '生成并复制',
    'info-help': '帮助',
    'info-source': '来源',
    'error-missing': '请先在每个项中做选择。',
    'error-invalid': '内部状态无效，请提交错误报告。',
  },

  // Traditional Chinese
  'zh-hant': {
    'timer-description': '此計時器將過期于：',
    'timer-progress': '此計時器將過期于：',
    'timer-finished': '此計時器已過期：',
    'timer-type': '計時器類型',
    'timer-type-generic': '通用',
    'timer-type-deletion': '刪除',
    'timer-type-ban': '封禁',
    'timer-type-shield': '屏蔽',
    'deletion-options': '刪除選項',
    'deletion-score': '目前文章分數為',
    'summary-deletion-reasons': [],
    'duration': '運行時間',
    'duration-1d': '1日',
    'duration-1w': '1周',
    'duration-2w': '2周',
    'duration-1y': '1年',
    'duration-custom': '自定義',
    'unit-minute': '分鐘',
    'unit-hour': '小時',
    'unit-day': '日',
    'unit-week': '周',
    'unit-month': '月',
    'unit-year': '年',
    'start-time': '開始時間',
    'start-time-now': '現在',
    'start-time-later': '稍後',
    'messages': '通知内容',
    'message-progress': '此計時器運行中（可選）',
    'message-finished': '此計時器已過期（可選）',
    'advanced-section': '高級設置',
    'height': '高度',
    'width': '寬度',
    'css-extra': '自定義計時器樣式（可選）',
    'template': '輸出内容模板',
    'template-deletion': '本文章目前為%%score%%分，現依據[[[deletions-guide|刪除指導]]]宣告將刪除此頁面：\n\n%%iframe%%\n\n請本文章的作者快速修改内容提高質量。\n如果該頁面作者無法及時的修改，其他人也可以在確認后向管理組申請重寫。',
    'template-ban': '[[div class=\"blockquote\"]]\n**XXXX年XX月XX日：**網站成員[[*user USERNAME]]【違規行爲】，根據以下規則和内容：\n【網站站規内容】\n\n將要對該網站成員進行封禁處分：\n%%iframe%%\n\n如果對此次處理結果有疑問，可以聯係管理組。本次處分允許\\不允許申訴。\n[[/div]]',
    'template-shield': '[[div class=\"blockquote\"]]\n**XXXX年XX月XX日：**網站成員[[*user USERNAME]]【違規行爲】，其濫用功能並根據以下規則和内容：\n【網站站規内容】\n\n將要對該網站成員進行限制討論功能的處分：\n%%iframe%%\n\n如果對此次處理結果有疑問，可以聯係管理組。本次處分允許\\不允許申訴。\n[[/div]]',
    'message-deletion-progress': '此頁面將在以下時間後刪除：',
    'message-deletion-finished': '此頁面在以下時間前可刪除：',
    'message-ban-progress': '此用戶封禁将過期于：',
    'message-ban-finished': '此用戶封禁已過期：',
    'message-shield-progress': '此討論屏蔽将過期于：',
    'message-shield-finished': '此討論屏蔽已過期：',
    'build-timer': '生成計時器',
    'build-and-copy-timer': '生成并複製',
    'info-help': '幫助',
    'info-source': '來源',
    'error-missing': '請先在每個選擇項完成選擇。',
    'error-invalid': '內部狀態無效，請提交錯誤報告。',
  },
};

function getMessage(language, messageKey, optionalMessage = false) {
  // Get message based on language
  var messages = TRANSLATIONS[language];
  if (!messages) {
    setError('No translations for language: ' + language);
    return null;
  }

  var message = messages[messageKey];
  if (!message) {
    if (language === 'test') {
      // Special case:
      // The 'test' language just echoes the message key back out unless overridden.
      return messageKey;
    } else if (!optionalMessage) {
      setError('No such message key: ' + messageKey);
    }
    return null;
  }

  return message;
}

function getDefaultDeletionScore(language) {
  switch (String(language)) {
    default:
      return -2;
  }
}

function insertCSS(styling) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  style.appendChild(document.createTextNode(styling));
  head.appendChild(style);
}

// Timer creation
function buildUrl(language, startDate, durationMs, progressMessage, finishedMessage, styling) {
  // Calculate target datetime
  var targetDate = new Date(startDate.getTime() + durationMs);

  // Finally, build URL
  var parameters = new URLSearchParams();
  parameters.append('lang', language);
  parameters.append('time', targetDate.toISOString());

  if (progressMessage) {
    parameters.append('progress', progressMessage);
  }

  if (finishedMessage) {
    parameters.append('finished', finishedMessage);
  }

  if (styling) {
    parameters.append('style', styling);
  }

  return 'https://timerdfc.pages.dev/timer.html?' + parameters;
}

function buildWikitext(language, template, url, score, height, width) {
  function getSummaryDeletionText() {
    var summaryDeletionBox = document.getElementById('summary-deletion-reason');
    if (summaryDeletionBox.value) {
      var retVal = " " + getMessage(language, 'summary-deletion-reason-skeleton');
      var reason = summaryDeletionBox.options[summaryDeletionBox.selectedIndex].text;
      return retVal.replace('%%reason%%', reason);
    } else {
      return "";
    }
  }

  var iframe = [
    '[[iframe ', url, ' style="width: ', width, '; height: ', height, '; border: 0; text-align: center;"]]',
  ].join('');

  return template
    .replace('%%url%%', url)
    .replace('%%score%%', score)
    .replace('%%iframe%%', iframe)
    .replace('%%summary%%', getSummaryDeletionText());
}

function findCheckedItem(selector) {
  var elements = document.querySelectorAll(selector);
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      return elements[i];
    }
  }

  alert(getMessage(language, 'error-missing'));
  throw new Error('Could not find a checked radio button item');
}

function getStartDate(language) {
  var element = findCheckedItem('#start input');
  switch (element.id) {
    case 'start-now':
      return new Date();
    case 'start-later':
      var dateElement = document.getElementById('start-later-date');
      var timeElement = document.getElementById('start-later-time');
      if (dateElement === null || timeElement === null) {
        alert(getMessage(language, 'error-missing'));
        throw new Error('Missing date or time element in getStartDate()');
      }

      return new Date(dateElement.value + ' ' + timeElement.value);
    default:
      alert(getMessage(language, 'error-invalid'));
      throw new Error('Invalid element ID in getStartDate()');
  }
}

function getDuration() {
  var element = findCheckedItem('#duration input');
  if (element.value !== 'custom') {
    return parseInt(element.value);
  }

  var valueElement = document.getElementById('duration-custom-value');
  var value = parseInt(valueElement.value);
  if (isNaN(value)) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('No value in custom duration selector');
  }

  var unitElement = document.getElementById('duration-custom-unit');
  var unit = parseInt(unitElement.value);

  return value * unit;
}

function getTextData(language) {
  var progressElement = document.getElementById('message-progress');
  if (progressElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing progress element in getTextData()');
  }

  var finishedElement = document.getElementById('message-finished');
  if (finishedElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing finished element in getTextData()');
  }

  var heightElement = document.getElementById('height');
  if (heightElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing height element in getTextData()');
  }

  var widthElement = document.getElementById('width');
  if (widthElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing width element in getTextData()');
  }

  var customCssElement = document.getElementById('custom-css');
  if (customCssElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing custom CSS element in getTextData()');
  }

  var templateElement = document.getElementById('template');
  if (templateElement === null) {
    alert(getMessage(language, 'error-missing'));
    throw new Error('Missing template element in getTextData()');
  }

  return {
    progressMessage: progressElement.value,
    finishedMessage: finishedElement.value,
    height: heightElement.value,
    width: widthElement.value,
    styling: customCssElement.value,
    template: templateElement.value,
  };
}

function buildTimer(language, copyToClipboard) {
  // Unhide output
  var outputElement = document.getElementById('output');
  outputElement.classList.remove('hidden');

  // Gather values
  var startDate = getStartDate(language);
  var durationMs = getDuration(language);
  var data = getTextData(language);
  var score = document.getElementById('deletion-score-value').value;

  // Build wikitext and output
  var url = buildUrl(
    language,
    startDate,
    durationMs,
    data.progressMessage,
    data.finishedMessage,
    data.styling,
  );

  outputElement.value = buildWikitext(language, data.template, url, score, data.height, data.width);

  if (copyToClipboard) {
    navigator.clipboard.writeText(outputElement.value);
  }
}

function setMessage(language, id, messageKey = null) {
  document.getElementById(id).innerText = getMessage(language, messageKey || id);
}

function initializeSummaryDeletionMessages(language) {
  // Summary deletion reasons vary by site
  var summaryDeletionBox = document.getElementById('summary-deletion-reason');
  var messages = getMessage(language, 'summary-deletion-reasons', true);
  for (var i = 0; i < messages.length; i++) {
    var message = messages[i];
    var opt = document.createElement('option');
    opt.value = opt.innerHTML = message;
    summaryDeletionBox.appendChild(opt);
  }

  // Only show summary deletion options if supported by the selected language
  if (summaryDeletionBox.children.length > 1) {
    setMessage(language, 'summary-deletion-label', 'summary-deletion');
    setMessage(language, 'summary-deletion-reason-none');
  } else {
    summaryDeletionBox.hidden = true;
    document.getElementById('summary-deletion-label').hidden = true;
  }
}

// Initialization
function initializeMessages(language) {

  setMessage(language, 'timer-type-label', 'timer-type');
  setMessage(language, 'timer-type-generic-label', 'timer-type-generic');
  setMessage(language, 'timer-type-deletion-label', 'timer-type-deletion');
  setMessage(language, 'timer-type-ban-label', 'timer-type-ban');
  setMessage(language, 'timer-type-shield-label', 'timer-type-shield');

  setMessage(language, 'deletion-options-label', 'deletion-options');
  setMessage(language, 'deletion-score-label', 'deletion-score');

  setMessage(language, 'start-label', 'start-time');
  setMessage(language, 'start-now-label', 'start-time-now');
  setMessage(language, 'start-later-label', 'start-time-later');

  setMessage(language, 'duration-label', 'duration');
  setMessage(language, 'duration-1d-label', 'duration-1d');
  setMessage(language, 'duration-1w-label', 'duration-1w');
  setMessage(language, 'duration-2w-label', 'duration-2w');
  setMessage(language, 'duration-1y-label', 'duration-1y');
  setMessage(language, 'duration-custom-label', 'duration-custom');

  setMessage(language, 'unit-minute');
  setMessage(language, 'unit-hour');
  setMessage(language, 'unit-day');
  setMessage(language, 'unit-week');
  setMessage(language, 'unit-month');
  setMessage(language, 'unit-year');

  setMessage(language, 'messages-label', 'messages');
  document.getElementById('message-progress').placeholder = getMessage(language, 'timer-progress');
  document.getElementById('message-finished').placeholder = getMessage(language, 'timer-finished');
  setMessage(language, 'message-progress-label', 'message-progress');
  setMessage(language, 'message-finished-label', 'message-finished');

  setMessage(language, 'advanced-label', 'advanced-section');
  setMessage(language, 'height-label', 'height');
  setMessage(language, 'width-label', 'width');
  setMessage(language, 'custom-css-label', 'css-extra');
  setMessage(language, 'template-label', 'template');
  document.getElementById('custom-css').placeholder = '#title {\n  color: #008080;\n}';

  setMessage(language, 'build', 'build-timer');
  setMessage(language, 'copy', 'build-and-copy-timer');
  setMessage(language, 'info-help');
  setMessage(language, 'info-source');

  initializeSummaryDeletionMessages(language);
}

function initializeDeletionScore(deletionScore) {
  var scoreBox = document.getElementById('deletion-score-value');
  scoreBox.value = deletionScore;
  scoreBox.onclick = scoreBox.onblur = function () {
    if (Number(scoreBox.value) > deletionScore) {
      scoreBox.style.backgroundColor = "yellow";
    } else {
      scoreBox.style.backgroundColor = "white";
    }
  }
}

function initializeHooks(language) {
  function toggleDeletionOptVisibility(show) {
    var deletionOptElement = document.getElementById('deletion-options');
    if (show) {
      deletionOptElement.classList.remove('hidden');
    } else {
      deletionOptElement.classList.add('hidden');
    }
  }

  document.getElementById('timer-type-generic').onclick = function () {
    document.getElementById('message-progress').value = '';
    document.getElementById('message-finished').value = '';
    document.getElementById('template').value = '%%iframe%%';

    toggleDeletionOptVisibility(false);
  };

  document.getElementById('timer-type-deletion').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-deletion-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-deletion-finished');
    document.getElementById('template').value = getMessage(language, 'template-deletion');

    toggleDeletionOptVisibility(true);
  };

  document.getElementById('timer-type-ban').onclick = function () {
    document.getElementById('message-progress').value = getMessage(language, 'message-ban-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-ban-finished');
    document.getElementById('template').value = getMessage(language, 'template-ban');

    toggleDeletionOptVisibility(false);
  };

  document.getElementById('timer-type-shield').onclick = function () {
    document.getElementById('message-progress').value = getMessage(language, 'message-shield-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-shield-finished');
    document.getElementById('template').value = getMessage(language, 'template-shield');

    toggleDeletionOptVisibility(false);
  };


  function onClickStartDate() {
    document.getElementById('start-later').click();
  }

  document.getElementById('start-later-date').onclick = onClickStartDate;
  document.getElementById('start-later-time').onclick = onClickStartDate;

  function onClickCustom() {
    document.getElementById('duration-custom').click();
  }

  document.getElementById('duration-custom-value').onclick = onClickCustom;
  document.getElementById('duration-custom-unit').onclick = onClickCustom;

  document.getElementById('build').onclick = function () {
    buildTimer(language, false);
  };
  document.getElementById('copy').onclick = function () {
    buildTimer(language, true);
  };
}

function setup() {
  // Get parameters
  var url = new URL(window.location.href);
  var parameters = new URLSearchParams(url.search);
  var language = parameters.get('lang');
  var styling = parameters.get('style');
  var deletionScore = parameters.get('delScore');

  // Check parameters
  if (!language) {
    setError('No language set', 'Parameter is "lang". Use "zh-hans" for Simplified Chinese.');
    return;
  }

  if (!deletionScore) {
    deletionScore = getDefaultDeletionScore(language);
  }

  // Insert custom CSS, if any
  if (styling !== null) {
    insertCSS(styling);
  }

  initializeMessages(language);
  initializeDeletionScore(deletionScore);
  initializeHooks(language);
}

setTimeout(setup, 5);