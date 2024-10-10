(function () {
    // Create the container for the chatbot and assistant
    const scriptTag = document.currentScript || document.querySelector('script[data-assistant-name][data-assistant-id]');
    const assistantName = scriptTag.getAttribute('data-assistant-name');
    const assistantId = scriptTag.getAttribute('data-assistant-id');
    let bgColor = scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)'; // Default bg color
    const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db'; // Default text color
    const fontSize = scriptTag.getAttribute('data-font-size') || '16px'; // Default font size

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
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform:translateY(0);}
            40% {transform:translateY(-10px);}
            60% {transform:translateY(-5px);}
          }

          #chatbot-icon {
            width: 150px;
            height: 150px;
          }

          #chatbot-icon img {
            width: 130px;
            height: 130px;
            object-fit: cover;
            border-radius: 0; /* No border radius */
          }
        </style>
    `;

    // Append the container to the body
    document.body.appendChild(container);

    if (assistantName && assistantId) {
        // Set the iframe's src to dynamically load the assistant based on the assistant_name and assistant_id
        document.getElementById("chatbot-iframe").src = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
    } else {
        console.error("Assistant name or ID not provided.");
    }

    // Chatbot icon click event to open the assistant
    document.getElementById("chatbot-icon").onclick = function () {
        document.getElementById("assistant-embed").style.display = "block";
        document.getElementById("chatbot-icon").style.display = "none";
    };

    // Minimize button click event to close the assistant
    document.getElementById("minimize-button").onclick = function () {
        document.getElementById("assistant-embed").style.display = "none";
        document.getElementById("chatbot-icon").style.display = "flex";
    };

    // Background color picker event listener
    document.getElementById("bg-color-picker").addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        document.getElementById("chatbot-iframe").style.backgroundColor = selectedColor;
    });
})();
