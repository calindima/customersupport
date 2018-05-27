"use strict";

document.addEventListener('DOMContentLoaded', getData);
let counter = 0;

function getData() {
    fetch("https://kea-alt-del.dk/customersupport/?count=10")
        .then(res => res.json())
        .then(data => {

            const parent = document.querySelector('#app');
            const template = document.querySelector('#requestTemplate').content;

            data.forEach(element => {
                console.log(element);

                const clone = template.cloneNode(true);
                const names = clone.querySelectorAll('.name span');
                const place = clone.querySelector('.place');
                const times = clone.querySelectorAll('.time');
                const message = clone.querySelector('.message');
                const fullMessage = clone.querySelector('.full-message');
                const importanceLvl = clone.querySelector('.importance');
                const btn = clone.querySelector('.btn:last-child');

                let middle = '';
                if (element.middle) {
                    middle = element.middle;
                }

                names.forEach(n => n.textContent = `${element.first} ${middle} ${element.last}`);
                times.forEach(t => t.textContent = `${element.time.day}/${element.time.month}/${element.time.year} ${element.time.hour}:${element.time.minute}:${element.time.second}`);
                place.textContent = element.place;
                message.textContent = element.message;
                fullMessage.textContent = element.full;
                importanceLvl.style.background = `hsl(${(element.importance - 100) * - 1}, 100%, 50%)`;

                btn.addEventListener('click', () => {
                    const currentTicket = event.target.parentElement.parentElement;

                    currentTicket.style.transition = "all 3s"

                    fetch("checked.svg")
                        .then(res => res.text())
                        .then(data => {
                            currentTicket.innerHTML = data;
                            const paths = document.querySelectorAll('polyline');
                            paths.forEach(path => {
                                path.style.fill = "none";
                                path.style.stroke = "green";
                                path.style.strokeWidth = "2em";
                                path.style.strokeDasharray = "1000";
                                path.style.strokeDashoffset = "1000";
                                path.style.transition = "all 3s ease-out";

                                setTimeout(() => {
                                    path.style.strokeDashoffset = "0";
                                }, 500);
                            });

                        });
                    setTimeout(() => {
                        currentTicket.style.transform = "translate(-1000px)";
                        setTimeout(() => {
                            currentTicket.style.display = "none";
                        }, 2100);
                    }, 2000);
                    counter++;
                    document.querySelector('#completedTasks span').textContent = counter;
                });

                parent.appendChild(clone);
            });
        });
}