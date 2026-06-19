/// ===============================
/// CHARTS SYSTEM
/// ===============================


let glucoseChart = null;

let currentChartFilter = "all";


/* ================= FILTER CHART ================= */
function filterChart(filter) {

   currentChartFilter = filter;

   updateChart();
}


/* ================= GET FILTERED DATA ================= */
function getFilteredChartData() {

   const user = getCurrentUser();

   let records = getRecordsByUser(user);

   // ordenar cronológicamente
   records.sort((a, b) =>
      new Date(a.date) - new Date(b.date)
   );

   const now = new Date();

   return records.filter(r => {

      const d = new Date(r.date);

      if (currentChartFilter === "day") {
         return d.toDateString() === now.toDateString();
      }

      if (currentChartFilter === "week") {
         return (now - d) <= 7 * 24 * 60 * 60 * 1000;
      }

      if (currentChartFilter === "month") {
         return d.getMonth() === now.getMonth()
            && d.getFullYear() === now.getFullYear();
      }

      if (currentChartFilter === "year") {
         return d.getFullYear() === now.getFullYear();
      }

      return true;
   });
}


/* ================= UPDATE CHART ================= */
function updateChart() {

   const ctx = document.getElementById("glucoseChart");

   let data = getFilteredChartData();

   if (!data || data.length === 0) {

      if (glucoseChart) {
         glucoseChart.destroy();
      }

      return;
   }

   let labels = data.map(r =>
      new Date(r.date).toLocaleString()
   );

   let values = data.map(r => r.glucose);

   if (glucoseChart) {
      glucoseChart.destroy();
   }

   glucoseChart = new Chart(ctx, {
      type: "line",
      data: {
         labels: labels,
         datasets: [{
            label: "Glucosa (mg/dL)",
            data: values,
            borderColor: "#1976d2",
            backgroundColor: "rgba(25,118,210,0.1)",
            tension: 0.3,
            fill: true,
            pointRadius: 3
         }]
      },
      options: {
         responsive: true,
         plugins: {
            legend: {
               display: true
            }
         },
         scales: {
            x: {
               ticks: {
                  maxRotation: 45,
                  minRotation: 45
               }
            },
            y: {
               beginAtZero: false
            }
         }
      }
   });
}


/* ================= AUTO INIT ================= */
function initChart() {

   currentChartFilter = "all";

   updateChart();
}