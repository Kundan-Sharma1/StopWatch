let [hours, minutes, seconds] = [0, 0, 0];
let laps = [];
let time = document.getElementById("time");
let timer = null;

function stopWatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    time.innerHTML = h + ":" + m + ":" + s;
}

function start() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopWatch, 1000);
}

function stop() {
    clearInterval(timer);
    renderLapTable();
}

function reset() {
    clearInterval(timer);
    [hours, minutes, seconds] = [0, 0, 0];
    laps = [];
    time.innerHTML = "00:00:00";
    document.getElementById("lap-table-container").innerHTML = "";
}

function lap() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    let currentLapTime = h + ":" + m + ":" + s;
    laps.push(currentLapTime);
}

function calculateTimeDifference(previous, current) {
    const [prevH, prevM, prevS] = previous.split(":").map(Number);
    const [currH, currM, currS] = current.split(":").map(Number);

    let prevTotalSeconds = prevH * 3600 + prevM * 60 + prevS;
    let currTotalSeconds = currH * 3600 + currM * 60 + currS;

    let diffSeconds = currTotalSeconds - prevTotalSeconds;

    let h = Math.floor(diffSeconds / 3600);
    diffSeconds %= 3600;
    let m = Math.floor(diffSeconds / 60);
    let s = diffSeconds % 60;

    return (
        (h < 10 ? "0" + h : h) + ":" +
        (m < 10 ? "0" + m : m) + ":" +
        (s < 10 ? "0" + s : s)
    );
}

function renderLapTable() {
    let container = document.getElementById("lap-table-container");
    container.innerHTML = "";

    if (laps.length === 0) return;

    let table = document.createElement("table");
    let headerRow = document.createElement("tr");

    let headers = ["Lap No.", "Lap Time", "Difference"];
    headers.forEach(headerText => {
        let th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    laps.forEach((lap, index) => {
        let row = document.createElement("tr");

        let lapNoCell = document.createElement("td");
        lapNoCell.textContent = index + 1;
        row.appendChild(lapNoCell);

        let lapTimeCell = document.createElement("td");
        lapTimeCell.textContent = lap;
        row.appendChild(lapTimeCell);

        let diffCell = document.createElement("td");
        if (index === 0) {
            diffCell.textContent = "00:00:00";
        } else {
            diffCell.textContent = calculateTimeDifference(laps[index - 1], lap);
        }
        row.appendChild(diffCell);

        table.appendChild(row);
    });

    container.appendChild(table);
}
