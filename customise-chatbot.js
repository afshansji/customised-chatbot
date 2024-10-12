(function (window) {
    window.YourChatbot = {
        init: function (options) {
            console.log("Chatbot API initialized with options:", options);

            const assistantId = options.assistantId;
            const bgColor = options.styles.bgColor || 'rgb(247, 245, 242)';
            const textColor = options.styles.textColor || '#d1d5db';
            const fontSize = options.styles.fontSize || '16px';
            const assistantName = options.assistantName || 'Assistant';

            const container = document.createElement("div");
            container.innerHTML = `
                <div id="assistant-embed-container">
                    <div id="chatbot-icon" style="position:fixed;bottom:40px;right:70px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;">
                        <img src="https://raw.githubusercontent.com/afshansji/embeded-chatbot/main/195-removebg-preview.png" alt="Chatbot" style="width:200px;height:200px;object-fit:cover;" />
                    </div>
                    <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:750px;height:530px;border:1px solid #ccc;border-radius:10px;display:none;background-color:${bgColor};">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background-color:#f0f0f0;border-top-left-radius:10px;border-top-right-radius:10px;">
                            <h4 style="margin:0;font-size:16px;">${assistantName} Assistant</h4>
                            <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;">
                                <i class="fas fa-chevron-down" style="color:#ff4d4f;"></i>
                            </button>
                        </div>
                        <iframe id="chatbot-iframe" width="100%" height="100%" 
                style="border: none; border-radius: 0 0 10px 10px; background-color: ${bgColor};" 
                title="Custom Chatbot"></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(container);

            const iframe = document.getElementById("chatbot-iframe");
            const baseURL = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
            const iframeSrc = `${baseURL}?bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
            iframe.src = iframeSrc;

            document.getElementById("chatbot-icon").onclick = function () {
                document.getElementById("assistant-embed").style.display = "block";
                document.getElementById("chatbot-icon").style.display = "none";
            };

            document.getElementById("minimize-button").onclick = function () {
                document.getElementById("assistant-embed").style.display = "none";
                document.getElementById("chatbot-icon").style.display = "flex";
            };

            // Pass styles to the iframe once it loads
            iframe.onload = function () {
                iframe.contentWindow.postMessage({
                    type: 'changeChatbotStyle',
                    styles: options.styles
                }, '*');
            };

            // Listen for incoming postMessage to handle dynamic updates
            window.addEventListener("message", function (event) {
                if (event.data.type === "changeBgColor") {
                    const newBgColor = event.data.bgColor;
                    const newIframeSrc = `${baseURL}?bgColor=${encodeURIComponent(newBgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
                    iframe.src = newIframeSrc;
                    localStorage.setItem('chatbot-bg-color', newBgColor);
                }
            }, false);
        }
    };
})(window);
