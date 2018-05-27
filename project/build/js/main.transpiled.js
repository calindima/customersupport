"use strict";

document.addEventListener('DOMContentLoaded', getData);
var counter = 0;

function getData() {
    fetch("https://kea-alt-del.dk/customersupport/?count=10").then(function (res) {
        return res.json();
    }).then(function (data) {

        var parent = document.querySelector('#app');
        var template = document.querySelector('#requestTemplate').content;

        data.forEach(function (element) {
            console.log(element);

            var clone = template.cloneNode(true);
            var names = clone.querySelectorAll('.name span');
            var place = clone.querySelector('.place');
            var times = clone.querySelectorAll('.time');
            var message = clone.querySelector('.message');
            var fullMessage = clone.querySelector('.full-message');
            var importanceLvl = clone.querySelector('.importance');
            var btn = clone.querySelector('.btn:last-child');

            var middle = '';
            if (element.middle) {
                middle = element.middle;
            }

            names.forEach(function (n) {
                return n.textContent = element.first + " " + middle + " " + element.last;
            });
            times.forEach(function (t) {
                return t.textContent = element.time.day + "/" + element.time.month + "/" + element.time.year + " " + element.time.hour + ":" + element.time.minute + ":" + element.time.second;
            });
            place.textContent = element.place;
            message.textContent = element.message;
            fullMessage.textContent = element.full;
            importanceLvl.style.background = "hsl(" + (element.importance - 100) * -1 + ", 100%, 50%)";

            btn.addEventListener('click', function () {
                var currentTicket = event.target.parentElement.parentElement;

                currentTicket.style.transition = "all 3s";

                fetch("checked.svg").then(function (res) {
                    return res.text();
                }).then(function (data) {
                    currentTicket.innerHTML = data;
                    var paths = document.querySelectorAll('polyline');
                    paths.forEach(function (path) {
                        path.style.fill = "none";
                        path.style.stroke = "green";
                        path.style.strokeWidth = "2em";
                        path.style.strokeDasharray = "1000";
                        path.style.strokeDashoffset = "1000";
                        path.style.transition = "all 3s ease-out";

                        setTimeout(function () {
                            path.style.strokeDashoffset = "0";
                        }, 500);
                    });
                });
                setTimeout(function () {
                    currentTicket.style.transform = "translate(-1000px)";
                    setTimeout(function () {
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
