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

  // 2. タイムラグを設けて監督からランダム返信
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * kantokuMessages.length);
    const replyText = kantokuMessages[randomIndex];

    appendMessage(replyText, 'kantoku');
    scrollToBottom();
  }, 800);
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

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}