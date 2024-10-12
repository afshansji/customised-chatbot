(function () {
    console.log("Chatbot script initialized.");

    const scriptTag = document.currentScript || document.querySelector('script[data-assistant-name][data-assistant-id]');
    console.log("Script tag:", scriptTag);

    const assistantName = scriptTag.getAttribute('data-assistant-name');
    const assistantId = scriptTag.getAttribute('data-assistant-id');
    console.log("Assistant Name:", assistantName, "Assistant ID:", assistantId);

    const storedBgColor = localStorage.getItem('chatbot-bg-color');
    console.log("Stored background color from localStorage:", storedBgColor);

    // Default bgColor from localStorage or data attribute or fallback value
    const bgColor = storedBgColor || scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)';
    const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
    const fontSize = scriptTag.getAttribute('data-font-size') || '16px';

    console.log("Background Color:", bgColor, "Text Color:", textColor, "Font Size:", fontSize);

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
                    style="border: none; border-radius: 0 0 10px 10px;" title="Custom Chatbot"></iframe>
            </div>
        </div>
    `;
    console.log("Chatbot container created:", container);

    document.body.appendChild(container);
    console.log("Chatbot container added to body.");

    const iframe = document.getElementById("chatbot-iframe");
    console.log("Iframe element:", iframe);

    // Define the base URL for the chatbot (replace with your actual endpoint)
    const baseURL = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
    
    // Construct the iframe source URL
    const iframeSrc = `${baseURL}?bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
    console.log("Iframe source URL:", iframeSrc);
    
    // Set the iframe source
    iframe.src = iframeSrc;

    // Show the chatbot when the icon is clicked
    document.getElementById("chatbot-icon").onclick = function () {
        console.log("Chatbot icon clicked.");
        document.getElementById("assistant-embed").style.display = "block";
        document.getElementById("chatbot-icon").style.display = "none";
    };

    // Minimize the chatbot
    document.getElementById("minimize-button").onclick = function () {
        console.log("Minimize button clicked.");
        document.getElementById("assistant-embed").style.display = "none";
        document.getElementById("chatbot-icon").style.display = "flex";
    };

    // Listen for postMessage events to change iframe background color dynamically
    window.addEventListener("message", function (event) {
        console.log("Received postMessage event:", event.data);
        if (event.data.type === "changeBgColor") {
            console.log("Changing background color to:", event.data.bgColor);
            localStorage.setItem('chatbot-bg-color', event.data.bgColor);
            const newIframeSrc = `${baseURL}?bgColor=${encodeURIComponent(event.data.bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
            console.log("Updated iframe source URL:", newIframeSrc);
            iframe.src = newIframeSrc;

            // Check if the iframe has loaded and log the URL
            iframe.onload = function () {
                console.log("Iframe loaded with new URL:", iframe.src);
            };
        }
    }, false);
})();
