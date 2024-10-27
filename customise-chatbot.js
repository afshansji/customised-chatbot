(function (window) {
    window.YourChatbot = {
        init: function () {
            const scriptTag = document.querySelector('script[src*="customise-chatbot.js"]');

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
            document.head.appendChild(link);
            
            const assistantName = scriptTag.getAttribute('data-assistant-name');
            const assistantId = scriptTag.getAttribute('data-assistant-id');
            const color = scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)'; 
            const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
            const fontSize = scriptTag.getAttribute('data-font-size') || '16px';

            console.log("Chatbot API initialized with options:", { assistantName, assistantId, color, textColor, fontSize });

            const container = document.createElement("div");
            container.innerHTML = `
                <div id="assistant-embed-container">
                    <div id="chatbot-icon" style="position:fixed;bottom:40px;right:50px;width:150px;height:150px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;z-index:9999;">
                        <img src="https://raw.githubusercontent.com/afshansji/embeded-chatbot/main/195-removebg-preview.png" alt="Chatbot" style="width:130px;height:130px;object-fit:cover;" />
                    </div>
                    <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:750px;height:530px;border:1px solid #ccc;border-radius:10px;display:none;background-color:${color};z-index:9999;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background: linear-gradient(90deg, #1969E9 0%, #05B8FB 100%);border-top-left-radius:10px;border-top-right-radius:10px;">
                            <h4 style="margin:0;color:white;font-size:16px;">${assistantName} Assistant</h4>
                             <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;">
                                <i class="fas fa-chevron-down" style="color:#ffffff;"></i>
                            </button>
                        </div>
                        <iframe id="chatbot-iframe" width="100%" height="100%" 
                            style="border: none; border-radius: 0 0 10px 10px; background-color: ${color};" 
                            title="Custom Chatbot">
                        </iframe>
                    </div>
                </div>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                        40% {transform: translateY(-10px);}
                        60% {transform: translateY(-5px);}
                    }
                    #chatbot-icon {
                        width: 150px;
                        height: 150px;
                    }
                    #chatbot-icon img {
                        width: 130px;
                        height: 130px;
                        object-fit: cover;
                        border-radius: 0;
                    }
                </style>
            `;
            document.body.appendChild(container);

            const iframe = document.getElementById("chatbot-iframe");
            const baseURL = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
            const iframeSrc = `${baseURL}?color=${encodeURIComponent(color)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
            console.log(`Iframe source set to: ${iframeSrc}`);
            iframe.src = iframeSrc;

            document.getElementById("chatbot-icon").onclick = function () {
                console.log("Chatbot icon clicked, opening chat window.");
                document.getElementById("assistant-embed").style.display = "block";
                document.getElementById("chatbot-icon").style.display = "none";
            };

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
