const xrtLast1 = {{ xrt_last_1|tojson }};
                    let currentIndex = 0;

                    function typeWriterEffect(text, element) {
                        let i = 0;
                        element.innerHTML = "";
                        function typeChar() {
                            if (i < text.length) {
                                element.innerHTML += text.charAt(i);
                                i++;
                                setTimeout(typeChar, 100);
                            }
                        }
                        typeChar();
                    }

                    function updateTable() {
                        const tableBody = document.getElementById("table-body");
                        const rows = tableBody.querySelectorAll('tr');
                        rows.forEach(row => {
                            row.querySelectorAll('.value, .change').forEach(cell => {
                                cell.classList.add('dust-out');
                            });
                        });

                        setTimeout(() => {
                            tableBody.innerHTML = "";

                            for (let i = 0; i < 3; i++) {
                                const index = (currentIndex + i) % xrtLast1.length;
                                const row = xrtLast1[index];
                                const changePercent = row[2];

                                const icon = changePercent.includes("+") ? "icon-up" : changePercent.includes("-") ? "icon-down" : "icon-dash";
                                const bgColorClass = changePercent.includes("+") ? "blinking-bg" : changePercent.includes("-") ? "red-blink" : "";
                                const changeColorClass = changePercent.includes("+") ? "green-text" : changePercent.includes("-") ? "red-text" : "neutral";

                                const tr = document.createElement("tr");

                                tr.innerHTML = `
                                    <td><span class="${icon}"></span> ${row[0]}</td>
                                    <td class="value ${bgColorClass}">${parseFloat(row[1]).toFixed(2)}</td>
                                    <td class="change ${changeColorClass}">${changePercent}</td>
                                `;
                                tableBody.appendChild(tr);

                                const valueCell = tr.querySelector('.value');
                                const changeCell = tr.querySelector('.change');

                                typeWriterEffect(parseFloat(row[1]).toFixed(2), valueCell);
                                typeWriterEffect(changePercent, changeCell);
                            }

                            currentIndex = (currentIndex + 1) % xrtLast1.length;
                        }, 500);
                    }

                    setInterval(updateTable, 5000);
                    updateTable();

                    function fetchUpdatedData() {
                        fetch('/update-data')
                            .then(response => response.json())
                            .then(data => {
                                const newsContainer = document.querySelector('.footer-marquee');
                                newsContainer.innerHTML = '';
                                data.news_links.forEach(link => {
                                    const anchor = document.createElement('a');
                                    anchor.href = link[1];
                                    anchor.className = 'text-card__link';
                                    anchor.textContent = link[0];
                                    newsContainer.appendChild(anchor);
                                    newsContainer.appendChild(document.createTextNode(' | '));
                                });

                                const tableBody = document.getElementById('table-body');
                                tableBody.innerHTML = '';
                                data.currency_data.forEach(row => {
                                    const changePercent = row[2];
                                    const icon = changePercent.includes("+") ? "icon-up" : changePercent.includes("-") ? "icon-down" : "icon-dash";
                                    const bgColorClass = changePercent.includes("+") ? "blinking-bg" : changePercent.includes("-") ? "red-blink" : "";
                                    const changeColorClass = changePercent.includes("+") ? "green-text" : changePercent.includes("-") ? "red-text" : "neutral";

                                    const tr = document.createElement("tr");
                                    tr.innerHTML = `
                                        <td><span class="${icon}"></span> ${row[0]}</td>
                                        <td class="value ${bgColorClass}">${parseFloat(row[1]).toFixed(2)}</td>
                                        <td class="change ${changeColorClass}">${changePercent}</td>
                                    `;
                                    tableBody.appendChild(tr);
                                });
                            })
                            .catch(error => console.error('Error fetching updated data:', error));
                    }

                    setInterval(fetchUpdatedData, 300000);
                    fetchUpdatedData();
