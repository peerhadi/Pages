const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function openDatabase() {
    return await sqlite.open({
        filename: "/tmp/database.db",
        driver: sqlite3.Database,
    });
}

async function initDB() {
    let db = await openDatabase();
    createTable(db);

    return db;
}

async function createTable(db) {
    db.exec(
        "create table if not exists page(" +
            "id integer primary key autoincrement," +
            "title text not null," +
            "content text not null" +
            ")",
    );
}

async function insertPage(db, title, content) {
    db.run("insert into page (title,content) values(?,?)", title, content);
}

async function listPages(db) {
    return await db.all("select title,content from page");
}

async function getPage(db, id) {
    return await db.get("select title,content from page where id = ?", id);
}

module.exports = {
    initDB,
    insertPage,
    listPages,
    getPage,
};
