import { openDB } from "idb";

export const dbPromise = openDB("daily-puzzle-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("progress")) {
      db.createObjectStore("progress");
    }
  },
});
