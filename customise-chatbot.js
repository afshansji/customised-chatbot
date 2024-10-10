(function () {
    const scriptTag = document.currentScript || document.querySelector('script[data-assistant-name][data-assistant-id]');
    const assistantName = scriptTag.getAttribute('data-assistant-name');
    const assistantId = scriptTag.getAttribute('data-assistant-id');
    let bgColor = localStorage.getItem('chatbot-bg-color') || scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)';
    const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
    const fontSize = scriptTag.getAttribute('data-font-size') || '16px';

    const container = document.createElement("div");
    container.innerHTML = `
        <div id="assistant-embed-container">
            <div id="chatbot-icon" style="position:fixed;bottom:40px;right:70px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;">
                <img src="https://raw.githubusercontent.com/afshansji/embeded-chatbot/main/195-removebg-preview.png" alt="Chatbot" style="width:200px;height:200px;object-fit:cover;" />
            </div>
            <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:750px;height:530px;border:1px solid #ccc;border-radius:10px;display:none;">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background-color:#f0f0f0;border-top-left-radius:10px;border-top-right-radius:10px;">
                    <h4 style="margin:0;font-size:16px;">${assistantName} Assistant</h4>
                    <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;">
                        <i class="fas fa-chevron-down" style="color:#ff4d4f;"></i>
                    </button>
                </div>
                <iframe id="chatbot-iframe" width="100%" height="100%" 
                    style="border: none; border-radius: 0 0 10px 10px; background-color: ${bgColor}; color: ${textColor}; font-size: ${fontSize};" title="Custom Chatbot"></iframe>
            </div>
        </div>
        <div style="position:fixed;bottom:20px;left:20px;">
            <label for="bg-color-picker" style="font-size:14px;color:${textColor};">Choose Chatbot Background Color: </label>
            <input type="color" id="bg-color-picker" value="${bgColor}" style="cursor:pointer;">
        </div>
    `;

    document.body.appendChild(container);

    if (assistantName && assistantId) {
        document.getElementById("chatbot-iframe").src = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
    } else {
        console.error("Assistant name or ID not provided.");
    }

    // Show the chatbot when the icon is clicked
    document.getElementById("chatbot-icon").onclick = function () {
        document.getElementById("assistant-embed").style.display = "block";
        document.getElementById("chatbot-icon").style.display = "none";
    };

    // Minimize the chatbot
    document.getElementById("minimize-button").onclick = function () {
        document.getElementById("assistant-embed").style.display = "none";
        document.getElementById("chatbot-icon").style.display = "flex";
    };

    // Change background color dynamically and persist it
    document.getElementById("bg-color-picker").addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        document.getElementById("chatbot-iframe").style.backgroundColor = selectedColor;
        localStorage.setItem('chatbot-bg-color', selectedColor);  // Save selected color to localStorage
    });
})();
