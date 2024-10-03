function updateTime() {
                            const now = new Date();
                            const formattedTime = now.toLocaleTimeString();
                            document.getElementById("time").textContent = formattedTime;
                        }
                        updateTime();
                        setInterval(updateTime, 1000);
