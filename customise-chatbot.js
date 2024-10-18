(function (window) {
    window.YourChatbot = {
        init: function () {
            // Retrieve the script tag
            const scriptTag = document.querySelector('script[src*="customise-chatbot.js"]');

            // Get the attributes from the script tag
            const assistantName = scriptTag.getAttribute('data-assistant-name');
            const assistantId = scriptTag.getAttribute('data-assistant-id');
            const color = scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)'; // Using "color" for background
            const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
            const fontSize = scriptTag.getAttribute('data-font-size') || '16px';

            console.log("Chatbot API initialized with options:", { assistantName, assistantId, color, textColor, fontSize });

            // Create the container for the chatbot
            const container = document.createElement("div");
            container.innerHTML = `
                <div id="assistant-embed-container">
                    <div id="chatbot-icon" style="position:fixed;bottom:40px;right:70px;width:200px;height:200px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;">
                        <img src="https://raw.githubusercontent.com/afshansji/embeded-chatbot/main/195-removebg-preview.png" alt="Chatbot" style="width:200px;height:200px;object-fit:cover;" />
                    </div>
                    <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:750px;height:530px;border:1px solid #ccc;border-radius:10px;display:none;background-color:${color};">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background-color:#f0f0f0;border-top-left-radius:10px;border-top-right-radius:10px;">
                            <h4 style="margin:0;font-size:16px;">${assistantName} Assistant</h4>
                            <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;padding-right:10px;">
                                <i class="fas fa-times" style="color:#ff4d4f;font-size:24px;"></i>
                            </button>
                        </div>
                        <iframe id="chatbot-iframe" width="100%" height="100%" 
                            style="border: none; border-radius: 0 0 10px 10px; background-color: ${color};" 
                            title="Custom Chatbot">
                        </iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(container);

            const iframe = document.getElementById("chatbot-iframe");
            // const baseURL = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
            const baseURL = `http://localhost:3000/assistants/${assistantName}/${assistantId}`;
            // Modified URL parameters to "color", "textColor", and "fontSize"
            const iframeSrc = `${baseURL}?color=${encodeURIComponent(color)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
            console.log(`Iframe source set to: ${iframeSrc}`);
            iframe.src = iframeSrc;

            // Handle chatbot icon click
            document.getElementById("chatbot-icon").onclick = function () {
                console.log("Chatbot icon clicked, opening chat window.");
                document.getElementById("assistant-embed").style.display = "block";
                document.getElementById("chatbot-icon").style.display = "none";
            };

            // Handle minimize button click
            document.getElementById("minimize-button").onclick = function () {
                console.log("Minimize button clicked, closing chat window.");
                document.getElementById("assistant-embed").style.display = "none";
                document.getElementById("chatbot-icon").style.display = "flex";
            };
        }
    };

    // Initialize the chatbot on load
    window.YourChatbot.init();
})(window);
