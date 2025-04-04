// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const clearButton = document.getElementById('clearButton');
const messageContainer = document.getElementById('messageContainer');

// AI Responses configuration
const aiResponses = {
    "hello": "Hello! How are you feeling today?",
    "hi": "Hi there! What's on your mind?",
    "sad": "I'm sorry to hear you're feeling sad. Would you like to talk about what's bothering you?",
    "anxious": "Anxiety can be challenging. Try taking slow, deep breaths. What specifically is making you anxious?",
    "stress": "Stress affects us all differently. What's causing you stress right now?",
    "default": "I'm here to listen. Can you tell me more about how you're feeling?"
};

// Event Listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
clearButton.addEventListener('click', clearChat);

// Functions
function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    // Display user message
    displayMessage(message, 'user');
    messageInput.value = '';

    // Simulate AI "thinking"
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        displayMessage(aiResponse, 'ai');
    }, 1000);
}

function displayMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('flex', 'space-y-4');

    if (sender === 'user') {
        messageDiv.classList.add('justify-end');
        messageDiv.innerHTML = `
            <div class="max-w-xs md:max-w-md bg-indigo-600 text-white p-3 rounded-lg rounded-tr-none">
                <p>${text}</p>
            </div>
        `;
    } else {
        messageDiv.classList.add('justify-start');
        messageDiv.innerHTML = `
            <div class="max-w-xs md:max-w-md bg-indigo-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
                <p>${text}</p>
            </div>
        `;
    }

    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    return aiResponses['default'];
}

function clearChat() {
    // Keep only the initial AI greeting
    while (messageContainer.children.length > 1) {
        messageContainer.removeChild(messageContainer.lastChild);
    }
}