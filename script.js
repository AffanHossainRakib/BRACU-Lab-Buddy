document.addEventListener("DOMContentLoaded", () => {
  const daySelect = document.getElementById("day-select");
  const timeSelect = document.getElementById("time-select");
  const findBtn = document.getElementById("find-btn");
  const findNowBtn = document.getElementById("find-now-btn");
  const resultsList = document.getElementById("results-list");
  const resultsContainer = document.getElementById("results-container");

  let cseLabSchedule = [];
  let uniqueLabs = new Set();
  const labInfo = new Map();

  // Fetch and process the JSON data
  fetch("CSE_Lab_Schedule.json")
    .then((response) => response.json())
    .then((data) => {
      cseLabSchedule = data;

      // Get unique labs and lab info
      cseLabSchedule.forEach((singleLabInfo) => {
        uniqueLabs.add(singleLabInfo["Lab Room"]);
        const key = `${singleLabInfo["Lab Day"]}-${singleLabInfo["Lab Time (3hr)"]}`;
        if (!labInfo.has(key)) {
          labInfo.set(key, new Set());
        }
        labInfo.get(key).add(singleLabInfo["Lab Room"]);
      });

      // Populate dropdowns
      const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];
      // const times = ["8:00 AM", "11:00 AM", "2:00 PM", "3:30 PM"];
      const times = ["8:00 AM", "11:00 AM", "2:00 PM"];

      days.forEach((day) => {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
      });

      times.forEach((time) => {
        const option = document.createElement("option");
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
      });

      // Initially hide the results container
      resultsContainer.style.display = "none";
    });

  function findAndDisplayFreeLabs(day, time) {
    const dayTime = `${day}-${time}`;
    resultsList.innerHTML = ""; // Clear previous results

    const busyLabs = labInfo.get(dayTime) || new Set();
    const freeLabs = [...uniqueLabs].filter((lab) => !busyLabs.has(lab));

    if (freeLabs.length > 0) {
      freeLabs.forEach((lab) => {
        const li = document.createElement("li");
        li.textContent = lab;
        li.className = "bg-green-100 text-green-800 p-2 rounded-md";
        resultsList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No free labs at this time.";
      li.className = "bg-red-100 text-red-800 p-2 rounded-md";
      resultsList.appendChild(li);
    }

    // Show the results container
    resultsContainer.style.display = "block";
  }

  findBtn.addEventListener("click", () => {
    const selectedDay = daySelect.value;
    const selectedTime = timeSelect.value;
    findAndDisplayFreeLabs(selectedDay, selectedTime);
  });

  findNowBtn.addEventListener("click", () => {
    const now = new Date();
    const dayMap = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
    };
    const currentDay = dayMap[now.getDay()];

    const hour = now.getHours() + now.getMinutes() / 60;
    let currentTime = "";

    if (hour >= 8 && hour < 11) {
      currentTime = "8:00 AM";
    } else if (hour >= 11 && hour < 14) {
      currentTime = "11:00 AM";
    } else if (hour >= 14 && hour < 15.5) {
      currentTime = "2:00 PM";
    } else if (hour >= 15.5 && hour < 18.5) {
      // Assuming 3 hour slot
      currentTime = "3:30 PM";
    }

    if (currentDay === "FRI") {
      resultsList.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = "Labs are closed on Friday.";
      li.className = "bg-blue-100 text-blue-800 p-2 rounded-md";
      resultsList.appendChild(li);
      resultsContainer.style.display = "block";
      return;
    }

    if (currentTime) {
      findAndDisplayFreeLabs(currentDay, currentTime);
    } else {
      resultsList.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = "Labs are currently closed.";
      li.className = "bg-blue-100 text-blue-800 p-2 rounded-md";
      resultsList.appendChild(li);
      resultsContainer.style.display = "block";
    }
  });
});
