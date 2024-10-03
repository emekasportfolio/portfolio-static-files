function updateRealTime() {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString();
            document.getElementById("real-time").textContent = formattedTime;
        }
        updateRealTime();
        setInterval(updateRealTime, 1000);
