(function () {
    const scriptTag = document.currentScript || document.querySelector('script[data-assistant-name][data-assistant-id]');
    const assistantName = scriptTag.getAttribute('data-assistant-name');
    const assistantId = scriptTag.getAttribute('data-assistant-id');
    const bgColor = localStorage.getItem('chatbot-bg-color') || scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)';
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
                    style="border: none; border-radius: 0 0 10px 10px;" title="Custom Chatbot"></iframe>
            </div>
        </div>
    `;

    document.body.appendChild(container);

    const iframe = document.getElementById("chatbot-iframe");

    if (assistantName && assistantId) {
        // Construct iframe URL with query parameters
        const iframeSrc = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}?bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
        console.log("Loading iframe with URL:", iframeSrc);
        iframe.src = iframeSrc;

    } else {
        console.error("Assistant name or ID not provided.");
    }

    // Show the chatbot when the icon is clicked
    document.getElementById("chatbot-icon").onclick = function () {
        console.log("Chatbot icon clicked");
        document.getElementById("assistant-embed").style.display = "block";
        document.getElementById("chatbot-icon").style.display = "none";
    };

    // Minimize the chatbot
    document.getElementById("minimize-button").onclick = function () {
        console.log("Minimize button clicked");
        document.getElementById("assistant-embed").style.display = "none";
        document.getElementById("chatbot-icon").style.display = "flex";
    };

    // Function to change iframe background color dynamically
    window.addEventListener("message", function (event) {
        if (event.data.type === "changeBgColor") {
            localStorage.setItem('chatbot-bg-color', event.data.bgColor);  // Save bg color to localStorage
            iframe.src = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}?bgColor=${encodeURIComponent(event.data.bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
        }
    }, false);

})();
