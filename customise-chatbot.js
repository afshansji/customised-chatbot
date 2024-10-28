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
                        <svg width="256" height="224" viewBox="0 0 256 224" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_9_337)">
            <path d="M128.001 41.1676C186.679 41.1676 234.247 82.0972 234.247 132.585C234.247 158.598 221.62 182.073 201.35 198.72C201.609 206.657 204.379 214.514 209.223 220.814C199.832 220.44 190.633 216.697 183.559 210.521C167.394 219.071 148.366 224.001 128.001 224.001C69.3237 224.001 21.7556 183.072 21.7556 132.585C21.7556 82.0972 69.3237 41.1676 128.001 41.1676ZM61.9673 176.882C65.8829 181.197 71.4622 183.622 77.2879 183.622H178.715C184.541 183.622 190.12 181.197 194.036 176.882C205.123 164.664 211.73 149.287 211.73 132.583C211.73 115.879 205.124 100.504 194.037 88.2856C190.121 83.9695 184.542 81.544 178.715 81.544H77.2893C71.3907 81.544 65.7806 84.0578 61.83 88.4354C50.8241 100.629 44.273 115.948 44.273 132.582C44.273 149.216 50.8801 164.662 61.9673 176.881V176.882Z" fill="${themeColor}" />
            <path d="M239.306 132.583C239.306 145.122 236.587 157.282 231.218 168.771C245.563 164.054 256.001 154.718 256.001 132.583C256.001 111.587 245.563 101.112 231.217 96.3953C236.585 107.89 239.306 120.055 239.306 132.583Z" fill={themeColor} />
            <path d="M243.609 69.2569V96.6628C247.331 99.0659 250.481 101.963 253.027 105.337C253.049 105.368 253.073 105.396 253.094 105.427V69.2569C253.094 66.6382 250.971 64.5151 248.352 64.5151C245.733 64.5151 243.609 66.6382 243.609 69.2569Z" fill={themeColor} />
            <path d="M16.6958 132.583C16.6958 145.122 19.414 157.282 24.7833 168.771C10.4387 164.054 -3.8147e-06 154.718 -3.8147e-06 132.583C-3.8147e-06 111.587 10.4387 101.112 24.7847 96.3953C19.4168 107.89 16.6958 120.055 16.6958 132.583Z" fill={themeColor} />
            <path d="M12.3938 69.2569V96.6628C8.67148 99.0659 5.52193 101.963 2.97596 105.337C2.95355 105.368 2.92975 105.396 2.90874 105.427V69.2569C2.90874 66.6382 5.03178 64.5151 7.65057 64.5151C10.2694 64.5151 12.3938 66.6382 12.3938 69.2569Z" fill={themeColor} />
            <path d="M150.579 129.749C153.666 134.5 158.119 129.749 167.423 129.749C176.728 129.749 181.18 134.5 184.266 129.749C187.253 125.148 179.012 113.801 167.423 113.801C155.835 113.801 147.593 125.15 150.579 129.749Z" fill={themeColor} />
            <path d="M71.7367 129.749C74.8232 134.5 79.2765 129.749 88.5809 129.749C97.8854 129.749 102.337 134.5 105.424 129.749C108.411 125.148 100.169 113.801 88.5809 113.801C76.9924 113.801 68.751 125.15 71.7367 129.749Z" fill={themeColor} />
            <path d="M128.001 151.367C134.495 151.367 138.779 146.217 138.958 145.999C139.929 144.811 139.754 143.061 138.566 142.09C137.379 141.12 135.628 141.295 134.658 142.483C134.639 142.504 131.825 145.811 128.001 145.811C124.178 145.811 121.363 142.504 121.335 142.47C120.365 141.282 118.62 141.113 117.432 142.083C116.245 143.054 116.074 144.81 117.046 145.998C117.225 146.217 121.509 151.365 128.003 151.365L128.001 151.367Z" fill="${themeColor}" />
            <path d="M0 1.07551H8.2723V12.7255H19.4841V1.07551H27.7774V30.9153H19.4841V19.5944H8.2723V30.9153H0V1.07551Z" fill="${themeColor}"/>
            <path d="M32.5164 19.4838C32.5164 17.8159 32.8231 16.2405 33.4378 14.756C34.0526 13.2716 34.9223 11.9776 36.0482 10.8727C37.1742 9.76781 38.5284 8.89116 40.1081 8.23997C41.6877 7.58878 43.4355 7.26389 45.3512 7.26389C47.267 7.26389 49.0441 7.58598 50.6392 8.22877C52.2329 8.87295 53.5969 9.7496 54.7313 10.8615C55.8642 11.9734 56.7423 13.2716 57.3641 14.756C57.9858 16.2405 58.2967 17.8173 58.2967 19.4838C58.2967 20.0104 58.2715 20.4277 58.2197 20.7344C58.1679 21.041 58.1133 21.3421 58.0559 21.6334H40.5688C40.7592 22.1894 41.0225 22.6935 41.3586 23.1473C41.6947 23.601 42.0756 23.9847 42.5 24.2925C42.9244 24.6003 43.3711 24.8292 43.8518 24.9791C44.3325 25.129 44.8433 25.1868 45.3512 25.1868C45.8608 25.1868 46.3711 25.129 46.8518 24.9791C47.3325 24.8292 47.7792 24.6003 48.2036 24.2925C48.6281 23.9847 49.009 23.601 49.345 23.1473C49.6811 22.6935 49.9443 22.1894 50.1347 21.6334H37.7768C37.7187 21.3421 37.6676 21.041 37.6195 20.7344C37.5717 20.4277 37.5466 20.0104 37.5466 19.4838H32.5164Z" fill="${themeColor}" />
        </g>
        <defs>
            <clipPath id="clip0_9_337">
                <rect width="256" height="224" fill="white" />
            </clipPath>
        </defs>
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
