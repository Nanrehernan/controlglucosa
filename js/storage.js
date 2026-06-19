let db = JSON.parse(localStorage.getItem("gluco")) || {
   users: [],
   current: null,
   records: []
};

/* ================= SAVE ================= */
function saveDB() {
   localStorage.setItem(
      "gluco",
      JSON.stringify(db)
   );
}

/* ================= GET USER ================= */
function getCurrentUser() {
   return db.current;
}

/* ================= SET USER ================= */
function setCurrentUser(username) {
   db.current = username;
   saveDB();
}

/* ================= ADD USER ================= */
function addUser(user) {

   db.users.push(user);

   saveDB();
}

/* ================= FIND USER ================= */
function findUser(username) {

   return db.users.find(
      u => u.username === username
   );
}

/* ================= DELETE USER ================= */
function deleteUser(username) {

   db.users = db.users.filter(
      u => u.username !== username
   );

   saveDB();
}

/* ================= ADD RECORD ================= */
function addRecord(record) {

   db.records.push(record);

   saveDB();
}

/* ================= DELETE RECORDS USER ================= */
function deleteRecordsByUser(username) {

   db.records = db.records.filter(
      r => r.user !== username
   );

   saveDB();
}

/* ================= GET RECORDS USER ================= */
function getRecordsByUser(username) {

   return db.records.filter(
      r => r.user === username
   );
}

/* ================= CLEAR ALL ================= */
function clearAllData() {

   db = {
      users: [],
      current: null,
      records: []
   };

   saveDB();
}