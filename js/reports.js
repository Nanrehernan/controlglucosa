/// ===============================
/// REPORTS SYSTEM
/// ===============================


/* ================= EXPORT JSON ================= */
function exportJSON() {

   const data = JSON.stringify(db, null, 2);

   const blob = new Blob([data], {
      type: "application/json"
   });

   const url = URL.createObjectURL(blob);

   const a = document.createElement("a");

   a.href = url;
   a.download = "glucocontrol_backup.json";

   a.click();

   URL.revokeObjectURL(url);
}


/* ================= IMPORT JSON ================= */
function importJSON() {

   const input = document.createElement("input");

   input.type = "file";
   input.accept = "application/json";

   input.onchange = e => {

      const file = e.target.files[0];

      const reader = new FileReader();

      reader.onload = event => {

         try {

            const imported = JSON.parse(event.target.result);

            if (!imported.users || !imported.records) {

               alert("Archivo inválido");
               return;
            }

            db = imported;

            saveDB();

            alert("Datos importados correctamente");

            location.reload();

         } catch (err) {

            alert("Error al leer archivo");
         }
      };

      reader.readAsText(file);
   };

   input.click();
}


/* ================= EXPORT PDF ================= */
function exportPDF() {

   const { jsPDF } = window.jspdf;

   const doc = new jsPDF();

   const user = getCurrentUser();

   let records = getRecordsByUser(user);

   records.sort((a, b) =>
      new Date(a.date) - new Date(b.date)
   );

   let gluc = records.map(r => r.glucose);

   let avg = gluc.length
      ? (gluc.reduce((a, b) => a + b, 0) / gluc.length).toFixed(1)
      : 0;

   let min = gluc.length ? Math.min(...gluc) : 0;
   let max = gluc.length ? Math.max(...gluc) : 0;

   // HEADER
   doc.setFontSize(14);
   doc.text("🩸 INFORME GLUCOSA", 10, 10);

   doc.setFontSize(11);
   doc.text("Usuario: " + user, 10, 20);

   doc.text("Promedio: " + avg + " mg/dL", 10, 30);
   doc.text("Mínimo: " + min, 10, 40);
   doc.text("Máximo: " + max, 10, 50);

   doc.text("Registros: " + records.length, 10, 60);

   // LISTADO
   let y = 75;

   doc.setFontSize(9);

   records.slice(-25).forEach(r => {

      const line =
         `${new Date(r.date).toLocaleString()} | ` +
         `G:${r.glucose} | I:${r.insulin}`;

      doc.text(line, 10, y);

      y += 6;

      if (y > 280) {
         doc.addPage();
         y = 10;
      }
   });

   doc.save("informe_glucosa.pdf");
}


/* ================= BASIC SUMMARY ================= */
function getClinicalSummary() {

   const user = getCurrentUser();

   let records = getRecordsByUser(user);

   let gluc = records.map(r => r.glucose);

   return {
      total: records.length,
      avg: gluc.length
         ? (gluc.reduce((a, b) => a + b, 0) / gluc.length).toFixed(1)
         : 0,
      min: gluc.length ? Math.min(...gluc) : 0,
      max: gluc.length ? Math.max(...gluc) : 0
   };
}