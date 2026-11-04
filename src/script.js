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

  appendMessage(text, 'user');
  userInput.value = "";
  scrollToBottom();

  setTimeout(() => {
    showReadStatus();
  }, 400);

  setTimeout(() => {
    showTypingIndicator();
  }, 800);

  setTimeout(() => {
    removeTypingIndicator();

    const randomIndex = Math.floor(Math.random() * kantokuMessages.length);
    const replyText = kantokuMessages[randomIndex];

    appendMessage(replyText, 'kantoku');
    scrollToBottom();
  }, 3300);
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

function showReadStatus() {
  const readDiv = document.createElement('div');
  readDiv.classList.add('read-status');
  readDiv.textContent = '既読';
  
  chatMessages.appendChild(readDiv);
  
  setTimeout(() => {
    readDiv.classList.add('show');
  }, 50);

  scrollToBottom();
}

function showTypingIndicator() {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'kantoku', 'typing-indicator-container');

  const bubbleDiv = document.createElement('div');
  bubbleDiv.classList.add('bubble');

  const dotsDiv = document.createElement('div');
  dotsDiv.classList.add('typing-dots');
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dotsDiv.appendChild(dot);
  }

  bubbleDiv.appendChild(dotsDiv);
  messageDiv.appendChild(bubbleDiv);
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator-container');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}