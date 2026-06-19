/// ===============================
/// RECORDS SYSTEM
/// ===============================


/* ================= SET DEFAULT DATE/TIME ================= */
function setDefaultDateTime() {

   const now = new Date();

   const dateInput = document.getElementById("recordDate");
   const timeInput = document.getElementById("recordTime");

   if (dateInput) {
      dateInput.value = now.toISOString().split("T")[0];
   }

   if (timeInput) {
      timeInput.value = now.toTimeString().slice(0, 5);
   }
}


/* ================= TOGGLE FOOD ================= */
function toggleFood() {

   const correction = document.getElementById("correction");
   const foodBlock = document.getElementById("foodBlock");

   if (correction.checked) {
      foodBlock.classList.add("hidden");
   } else {
      foodBlock.classList.remove("hidden");
   }
}


/* ================= SAVE RECORD ================= */
function saveRecord() {

   const user = getCurrentUser();

   const glucose = document.getElementById("glucose").value;
   const insulin = document.getElementById("insulin").value;
   const meal = document.getElementById("meal").value;
   const food = document.getElementById("food").value;

   const date = document.getElementById("recordDate").value;
   const time = document.getElementById("recordTime").value;

   const correction = document.getElementById("correction").checked;

   if (!glucose) {
      alert("Ingresa glucosa");
      return;
   }

   if (!insulin) {
      alert("Ingresa insulina");
      return;
   }

   const recordDateTime = new Date(date + "T" + time);

   const record = {
      id: Date.now(),
      user,
      glucose: Number(glucose),
      insulin: Number(insulin),
      meal,
      food: correction ? null : food,
      correction,
      date: recordDateTime.toISOString()
   };

   addRecord(record);

   renderHistory();
   updateDashboard();
   updateChart();

   clearForm();
}


/* ================= CLEAR FORM ================= */
function clearForm() {

   document.getElementById("glucose").value = "";
   document.getElementById("insulin").value = "";
   document.getElementById("food").value = "";
   document.getElementById("meal").value = "";
   document.getElementById("correction").checked = false;

   document.getElementById("foodBlock").classList.remove("hidden");

   setDefaultDateTime();
}


/* ================= RENDER HISTORY ================= */
function renderHistory() {

   const container = document.getElementById("historyContainer");

   const user = getCurrentUser();

   let records = getRecordsByUser(user);

   records.sort((a, b) => new Date(a.date) - new Date(b.date));

   container.innerHTML = records.map(r => {

      return `
        <div class="history-item">
            <b>🩸 ${r.glucose} mg/dL</b> | 💉 ${r.insulin} UI<br>
            🍽️ ${r.correction ? "Corrección" : r.meal}<br>
            ${r.food ? "📝 " + r.food : ""}<br>
            🕒 ${new Date(r.date).toLocaleString()}
        </div>
        `;
   }).join("");
}


/* ================= INIT RECORD MODULE ================= */
function initRecords() {

   setDefaultDateTime();
}