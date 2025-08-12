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

// Set color mode
function checkDarkTheme() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('theme') === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
document.addEventListener('DOMContentLoaded', checkDarkTheme);

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
    'ban-options': '封禁选项',
    'ban-options-user': '封禁用户',
    'ban-options-date': '封禁日期',
    'ban-options-appeal': '申诉情况',
    'ban-options-appeal-allow': '允许',
    'ban-options-appeal-forbid': '不允许',
    'ban-options-describe': '违规行为描述',
    'ban-options-rule': '封禁规则依据（必填）',
    'ban-options-rule-placeholder': '* 网站站规 - 社区环境相关\n * 第X条 - 第X款 规则内容 ',
    'shield-options': '屏蔽选项',
    'shield-options-user': '屏蔽用户',
    'shield-options-date': '屏蔽日期',
    'shield-options-appeal': '申诉情况',
    'shield-options-appeal-allow': '允许',
    'shield-options-appeal-forbid': '不允许',
    'shield-options-describe': '违规行为描述',
    'shield-options-rule': '屏蔽规则依据（必填）',
    'shield-options-rule-placeholder': '* 网站站规 - 社区环境相关\n * 第X条 - 第X款 规则内容 ',
    'duration': '运行时间',
    'duration-1d': '1日',
    'duration-2d': '2日',
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
    'template-deletion': '此文章目前为%%score%%分，现依据[[[deletions-guide|删除指导]]]宣告将删除此页面：\n\n%%iframe%%\n\n请本文章作者尽快进行修改内容提高质量。\n如果该页面作者无法及时做出更改，其他人也可以在确认后向管理组申请重写。',
    'template-ban': '[[div class=\"blockquote\"]]\n**%%banDate%%：**网站成员[[*user %%banUser%%]]涉及到%%banDescribe%%的违规行为，根据以下规则和内容：\n%%banRule%%\n\n将要对该网站成员进行封禁处分：\n%%iframe%%\n\n如果对此次处理结果有疑问，可以联系管理组。本次处分%%banAppeal%%申诉。\n[[/div]]',
    'template-shield': '[[div class=\"blockquote\"]]\n**%%shieldDate%%：**网站成员[[*user %%shieldUser%%]]涉及到%%shieldDescribe%%的违规行为，其滥用功能并根据以下规则和内容：\n%%shieldRule%%\n\n将要对该网站成员进行限制讨论功能的处分：\n%%iframe%%\n\n如果对此次处理结果有疑问，可以联系管理组。本次处分%%shieldAppeal%%申诉。\n[[/div]]',
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
    'ban-options': '封禁選項',
    'ban-options-user': '封禁用戶',
    'ban-options-date': '封禁日期',
    'ban-options-appeal': '申诉情况',
    'ban-options-appeal-allow': '允許',
    'ban-options-appeal-forbid': '不允許',
    'ban-options-describe': '違規行為描述',
    'ban-options-rule': '封禁規則依據（必填）',
    'ban-options-rule-placeholder': '* 網站站規 - 社區環境相關\n * 第X條 - 第X款 規則內容 ',
    'shield-options': '屏蔽選項',
    'shield-options-user': '屏蔽用戶',
    'shield-options-date': '屏蔽日期',
    'shield-options-appeal': '申訴情況',
    'shield-options-appeal-allow': '允許',
    'shield-options-appeal-forbid': '不允許',
    'shield-options-describe': '違規行為描述',
    'shield-options-rule': '屏蔽規則依據（必填）',
    'shield-options-rule-placeholder': '* 網站站規 - 社區環境相關\n * 第X條 - 第X款 規則內容 ',
    'duration': '運行時間',
    'duration-1d': '1日',
    'duration-2d': '2日',
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
    'template-deletion': '此文章目前為%%score%%分，現依據[[[deletions-guide|刪除指導]]]宣告將刪除此頁面：\n\n%%iframe%%\n\n請本文章作者盡快進行修改內容提高質量。\n如果該頁面作者無法及時做出更改，其他人也可以在確認後向管理組申請重寫。',
    'template-ban': '[[div class="blockquote"]]\n**%%banDate%%：**網站成員[[*user %%banUser%%]]涉及到%%banDescribe%%的違規行為，根據以下規則和內容：\n%%banRule%%\n\n將要對該網站成員進行封禁處分：\n%%iframe%%\n\n如果對此次處理結果有疑問，可以聯系管理組。本次處分%%banAppeal%%申訴。\n[[/div]]',
    'template-shield': '[[div class="blockquote"]]\n**%%shieldDate%%：**網站成員[[*user %%shieldUser%%]]涉及到%%shieldDescribe%%的違規行為，其濫用功能並根據以下規則和內容：\n%%shieldRule%%\n\n將要對該網站成員進行限製討論功能的處分：\n%%iframe%%\n\n如果對此次處理結果有疑問，可以聯系管理組。本次處分%%shieldAppeal%%申訴。\n[[/div]]',
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

  function getBanUserText() {
    var banUserBox = document.getElementById('ban-options-user-value');
    if (banUserBox.value) {
      var retBanUser = banUserBox.value;
      return retBanUser.replace('%%banUser%%', retBanUser);
    } else {
      return "USERNAME";
    }
  }

  function getBanDateText() {
    var banDateBox = document.getElementById('ban-options-date-value').valueAsNumber;
    if (banDateBox) {
      var date = new Date(banDateBox);
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var retBanDate = year + '年' + month + '月' + day + '日';
      return retBanDate.replace('%%banDate%%', retBanDate);
    } else {
      return "YYYY年MM月DD日";
    }
  }

  function getBanDescribeText() {
    var banDescribeBox = document.getElementById('ban-options-describe-value');
    if (banDescribeBox.value) {
      var retBanDescribe = banDescribeBox.value;
      return retBanDescribe.replace('%%banDescribe%%', retBanDescribe);
    } else {
      return "【违规行为】";
    }
  }

  function getBanRuleText() {
    var banRuleBox = document.getElementById('ban-options-rule');
    if (banRuleBox.value) {
      var retBanRule = banRuleBox.value;
      return retBanRule.replace('%%banRule%%', retBanRule);
    } else {
      return "【网站站规内容】";
    }
  }

  function getBanAppealText() {
    var banAppealBox = document.getElementById('ban-options-appeal');
    if (banAppealBox.value) {
      var retBanAppeal = banAppealBox.options[banAppealBox.selectedIndex].text;
      return retBanAppeal.replace('%%banAppeal%%', retBanAppeal);
    } else {
      return "";
    }
  }

  function getShieldUserText() {
    var shieldUserBox = document.getElementById('shield-options-user-value');
    if (shieldUserBox.value) {
      var retShieldUser = shieldUserBox.value;
      return retShieldUser.replace('%%shieldUser%%', retShieldUser);
    } else {
      return "USERNAME";
    }
  }

  function getShieldDateText() {
    var shieldDateBox = document.getElementById('shield-options-date-value').valueAsNumber;
    if (shieldDateBox) {
      var date = new Date(shieldDateBox);
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2);
      var day = ('0' + date.getDate()).slice(-2);
      var retShieldDate = year + '年' + month + '月' + day + '日';
      return retShieldDate.replace('%%shieldDate%%', retShieldDate);
    } else {
      return "YYYY年MM月DD日";
    }
  }

  function getShieldDescribeText() {
    var shieldDescribeBox = document.getElementById('shield-options-describe-value');
    if (shieldDescribeBox.value) {
      var retShieldDescribe = shieldDescribeBox.value;
      return retShieldDescribe.replace('%%shieldDescribe%%', retShieldDescribe);
    } else {
      return "【违规行为】";
    }
  }

  function getShieldRuleText() {
    var shieldRuleBox = document.getElementById('shield-options-rule');
    if (shieldRuleBox.value) {
      var retShieldRule = shieldRuleBox.value;
      return retShieldRule.replace('%%shieldRule%%', retShieldRule);
    } else {
      return "【网站站规内容】";
    }
  }

  function getShieldAppealText() {
    var shieldAppealBox = document.getElementById('shield-options-appeal');
    if (shieldAppealBox.value) {
      var retShieldAppeal = shieldAppealBox.options[shieldAppealBox.selectedIndex].text;
      return retShieldAppeal.replace('%%shieldAppeal%%', retShieldAppeal);
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
    .replace('%%summary%%', getSummaryDeletionText())
    .replace('%%banUser%%', getBanUserText())
    .replace('%%banDate%%', getBanDateText())
    .replace('%%banDescribe%%', getBanDescribeText())
    .replace('%%banRule%%', getBanRuleText())
    .replace('%%banAppeal%%', getBanAppealText())
    .replace('%%shieldUser%%', getShieldUserText())
    .replace('%%shieldDate%%', getShieldDateText())
    .replace('%%shieldDescribe%%', getShieldDescribeText())
    .replace('%%shieldRule%%', getShieldRuleText())
    .replace('%%shieldAppeal%%', getShieldAppealText());
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

  setMessage(language, 'ban-options-label', 'ban-options');
  setMessage(language, 'ban-options-user-label', 'ban-options-user');
  setMessage(language, 'ban-options-date-label', 'ban-options-date');
  setMessage(language, 'ban-options-appeal-label', 'ban-options-appeal');
  setMessage(language, 'ban-options-appeal-allow-label', 'ban-options-appeal-allow');
  setMessage(language, 'ban-options-appeal-forbid-label', 'ban-options-appeal-forbid');
  setMessage(language, 'ban-options-describe-label', 'ban-options-describe');
  setMessage(language, 'ban-options-rule-label', 'ban-options-rule');
  document.getElementById('ban-options-rule').placeholder = getMessage(language, 'ban-options-rule-placeholder');

  setMessage(language, 'shield-options-label', 'shield-options');
  setMessage(language, 'shield-options-user-label', 'shield-options-user');
  setMessage(language, 'shield-options-date-label', 'shield-options-date');
  setMessage(language, 'shield-options-appeal-label', 'shield-options-appeal');
  setMessage(language, 'shield-options-appeal-allow-label', 'shield-options-appeal-allow');
  setMessage(language, 'shield-options-appeal-forbid-label', 'shield-options-appeal-forbid');
  setMessage(language, 'shield-options-describe-label', 'shield-options-describe');
  setMessage(language, 'shield-options-rule-label', 'shield-options-rule');
  document.getElementById('shield-options-rule').placeholder = getMessage(language, 'shield-options-rule-placeholder');

  setMessage(language, 'start-label', 'start-time');
  setMessage(language, 'start-now-label', 'start-time-now');
  setMessage(language, 'start-later-label', 'start-time-later');

  setMessage(language, 'duration-label', 'duration');
  setMessage(language, 'duration-1d-label', 'duration-1d');
  setMessage(language, 'duration-2d-label', 'duration-2d');
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

  function toggleBanOptVisibility(show) {
    var banOptElement = document.getElementById('ban-options');
    if (show) {
      banOptElement.classList.remove('hidden');
    } else {
      banOptElement.classList.add('hidden');
    }
  }

  function toggleShieldOptVisibility(show) {
    var shieldOptElement = document.getElementById('shield-options');
    if (show) {
      shieldOptElement.classList.remove('hidden');
    } else {
      shieldOptElement.classList.add('hidden');
    }
  }

  document.getElementById('duration-1d').click();
  document.getElementById('timer-type-generic').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = '';
    document.getElementById('message-finished').value = '';
    document.getElementById('template').value = '%%iframe%%';

    toggleDeletionOptVisibility(false);
    toggleBanOptVisibility(false);
    toggleShieldOptVisibility(false);
  };

  document.getElementById('timer-type-deletion').onclick = function () {
    document.getElementById('duration-2d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-deletion-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-deletion-finished');
    document.getElementById('template').value = getMessage(language, 'template-deletion');

    toggleDeletionOptVisibility(true);
    toggleBanOptVisibility(false);
    toggleShieldOptVisibility(false);
  };

  document.getElementById('timer-type-ban').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-ban-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-ban-finished');
    document.getElementById('template').value = getMessage(language, 'template-ban');

    toggleDeletionOptVisibility(false);
    toggleBanOptVisibility(true);
    toggleShieldOptVisibility(false);
  };

  document.getElementById('timer-type-shield').onclick = function () {
    document.getElementById('duration-1d').click();
    document.getElementById('message-progress').value = getMessage(language, 'message-shield-progress');
    document.getElementById('message-finished').value = getMessage(language, 'message-shield-finished');
    document.getElementById('template').value = getMessage(language, 'template-shield');

    toggleDeletionOptVisibility(false);
    toggleBanOptVisibility(false);
    toggleShieldOptVisibility(true);
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