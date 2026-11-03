// 監督の仮返信メッセージ集
const kantokuMessages = [
  "まだ足りない！",
  "ここで根性見せんかい！",
  "やればいいんだよ！",
  "そんなもんじゃないだろ！！"
];

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  // 1. ユーザーメッセージの表示
  appendMessage(text, 'user');
  userInput.value = "";
  scrollToBottom();

  // 2. 少し遅れて「既読」を表示し、さらにその後に監督の返信を出す
  setTimeout(() => {
    showReadStatus(); // 既読をつける
  }, 400); // 送信から0.4秒後に既読に

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * kantokuMessages.length);
    const replyText = kantokuMessages[randomIndex];

    appendMessage(replyText, 'kantoku');
    scrollToBottom();
  }, 1000); // 送信から1.0秒後に監督が返信
}

function appendMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('bubble');
  bubbleDiv.textContent = text;

  messageDiv.appendChild(bubbleDiv);
  chatMessages.appendChild(messageDiv);
}

// 既読表示を追加する関数
function showReadStatus() {
  const readDiv = document.createElement('div');
  readDiv.classList.add('read-status');
  readDiv.textContent = '既読';
  
  chatMessages.appendChild(readDiv);
  
  // 少し遅れてクラスを付与してフワッと表示させる
  setTimeout(() => {
    readDiv.classList.add('show');
  }, 50);

  scrollToBottom();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}