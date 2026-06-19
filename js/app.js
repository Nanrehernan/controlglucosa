/// ===============================
/// APP CONTROLLER
/// ===============================


/* ================= START APP ================= */
function startApp() {

   document.getElementById("authSection").classList.add("hidden");
   document.getElementById("appSection").classList.remove("hidden");

   updateUserBadge();

   showSection("dashboard");

   initRecords();
   initChart();

   renderHistory();
}


/* ================= SHOW SECTIONS ================= */
function showSection(sectionId) {

   const sections = document.querySelectorAll(".section");

   sections.forEach(s => {
      s.classList.add("hidden");
   });

   document.getElementById(sectionId).classList.remove("hidden");

   // refrescar datos según sección
   if (sectionId === "dashboard") {
      updateChart();
   }

   if (sectionId === "history") {
      renderHistory();
   }

   if (sectionId === "registerRecord") {
      initRecords();
   }
}


/* ================= UPDATE DASHBOARD ================= */
function updateDashboard() {

   const stats = getClinicalSummary();

   const container = document.getElementById("statsContainer");

   if (!container) return;

   container.innerHTML = `
        <div class="stat-box">
            <b>📊 Total</b><br>${stats.total}
        </div>

        <div class="stat-box">
            <b>📈 Promedio</b><br>${stats.avg}
        </div>

        <div class="stat-box">
            <b>📉 Mín</b><br>${stats.min}
        </div>

        <div class="stat-box">
            <b>📈 Máx</b><br>${stats.max}
        </div>
    `;
}


/* ================= INIT APP ================= */
function initApp() {

   // usuario persistente
   if (getCurrentUser()) {

      startApp();

   } else {

      document.getElementById("authSection")
         .classList.remove("hidden");

      document.getElementById("appSection")
         .classList.add("hidden");
   }
}


/* ================= INIT ON LOAD ================= */
window.onload = function () {

   initApp();
};