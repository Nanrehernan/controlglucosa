/// ===============================
/// AUTH SYSTEM
/// ===============================


/* ================= TOGGLE AUTH UI ================= */
function toggleAuth() {

   const loginBox = document.getElementById("loginBox");
   const registerBox = document.getElementById("registerBox");

   loginBox.classList.toggle("hidden");
   registerBox.classList.toggle("hidden");
}


/* ================= REGISTER ================= */
function register() {

   const username = document.getElementById("regUser").value.trim();
   const password = document.getElementById("regPass").value.trim();

   if (!username || !password) {
      alert("Completa todos los campos");
      return;
   }

   if (findUser(username)) {
      alert("El usuario ya existe");
      return;
   }

   addUser({
      username,
      password
   });

   alert("Usuario creado correctamente");

   document.getElementById("regUser").value = "";
   document.getElementById("regPass").value = "";

   toggleAuth();
}


/* ================= LOGIN ================= */
function login() {

   const username = document.getElementById("loginUser").value.trim();
   const password = document.getElementById("loginPass").value.trim();

   const user = findUser(username);

   if (!user || user.password !== password) {
      alert("Usuario o contraseña incorrectos");
      return;
   }

   setCurrentUser(username);

   startApp();
}


/* ================= LOGOUT ================= */
function logout() {

   setCurrentUser(null);

   location.reload();
}


/* ================= DELETE ACCOUNT ================= */
function deleteAccount() {

   const user = getCurrentUser();

   if (!user) {
      return;
   }

   const confirmDelete = confirm(
      "¿Seguro que deseas eliminar tu cuenta y todos tus datos?"
   );

   if (!confirmDelete) return;

   deleteRecordsByUser(user);
   deleteUser(user);

   setCurrentUser(null);

   location.reload();
}


/* ================= UPDATE HEADER USER ================= */
function updateUserBadge() {

   const badge = document.getElementById("userBadge");

   const user = getCurrentUser();

   if (user) {
      badge.textContent = "🔵 " + user;
   } else {
      badge.textContent = "Sin usuario";
   }
}

/* ================= DELETE USER DATA (CURRENT USER ONLY) ================= */


function deleteMyData(){

    const user = getCurrentUser();

    if(!user){
        alert("No hay usuario activo");
        return;
    }

    const confirmDelete = confirm(
        "⚠️ ¿Seguro que deseas eliminar TODOS tus registros? Esta acción no se puede deshacer."
    );

    if(!confirmDelete) return;

    deleteRecordsByUser(user);

    saveDB();

    alert("Datos eliminados correctamente");

    // refrescar vista
    renderHistory();
    updateDashboard();
    updateChart();
}