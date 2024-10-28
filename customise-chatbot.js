(function (window) {
    window.YourChatbot = {
        init: function () {
            const scriptTag = document.querySelector('script[src*="customise-chatbot.js"]');

            // Load Font Awesome
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
            document.head.appendChild(link);

            // Extract attributes from script tag
            const assistantName = scriptTag.getAttribute('data-assistant-name');
            const assistantId = scriptTag.getAttribute('data-assistant-id');
            const color = scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)';
            const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
            const fontSize = scriptTag.getAttribute('data-font-size') || '16px';
            const themeColor = scriptTag.getAttribute('data-theme-color') || '#0F91F2';

            console.log("Chatbot API initialized with options:", { assistantName, assistantId, color, textColor, fontSize, themeColor });

            // Create container elements
            const container = document.createElement("div");
            container.innerHTML = `
                <div id="assistant-embed-container">
                    <div id="chatbot-icon" style="position:fixed;bottom:40px;right:50px;width:150px;height:150px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;z-index:9999;">
                        <svg id="chatbot-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="130px" height="130px" style="object-fit:cover;">
                            <path fill="${themeColor}" opacity="1.000000" stroke="none" d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5 z" />
                        </svg>
                    </div>
                    <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:510px;height:580px;border:1px solid #ccc;border-radius:10px;display:none;background-color:${color};z-index:9999;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background: ${themeColor};border-top-left-radius:10px;border-top-right-radius:10px;">
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
                </style>
            `;
            document.body.appendChild(container);

            const iframe = document.getElementById("chatbot-iframe");
            const baseURL = "http://localhost:3000/assistants/Course-Genie/asst_dndP3WOg68TfrVydoTmZtBIz";
            const iframeSrc = `${baseURL}?color=${encodeURIComponent(color)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}&themeColor=${encodeURIComponent(themeColor)}&isAuthenticated=true`;
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

            // Function to update SVG fills dynamically
            function updateSVGColor() {
                const svgPaths = document.querySelectorAll('#chatbot-icon-svg path');
                svgPaths.forEach(path => {
                    path.setAttribute('fill', themeColor);
                });
            }

            // Call the function to set the initial color
            updateSVGColor();
        }
    };

    // Initialize the chatbot on load
    window.YourChatbot.init();
})(window);
