import * as sqlite from "sqlite3";

import { _print, _get_tx_bytes } from "../swap";

const db = new sqlite.Database("test.db");

export const openDB = (s: string) => {

  db.serialize(() => {
    // db.run(`DROP TABLE playlists`);
    // db.run(`CREATE TABLE playlists([PlaylistId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,[Name] NVARCHAR(120))`);
    // db.run(`INSERT INTO playlists (name) VALUES  ('Music'), ('Movies'), ('TV Shows')`);
    db.get(`SELECT * FROM playlists`, (err, rows) => {
      console.log(err, rows);
    });
  });
};

export const getDBData = (index: number, s: string) => {

};

export const _run = (s: number , size: number) => {
  const sql = _print(s, size);

  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err, "error");
    }
    console.log(rows);
  });

};
