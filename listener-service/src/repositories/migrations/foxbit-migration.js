import r from 'rethinkdb';
import Repository from '../repository';
import Debug from '../../core/tools/Debug';

class FoxbitMigration {
  constructor() {
    this.repository = new Repository();
  }

  createDatabase(dbName) {
    return this.repository.openDbConnection().then(conn => {
      r.dbList().run(conn).then(dbs => {
        if (dbs.indexOf(dbName) === -1) {
          Debug.highlight(`Database ${dbName}, created!`);
          r.dbCreate(dbName).run(conn);
        }
      });
    });
  }

  createTable(database, tableName) {
    return this.repository.openDbConnection().then(conn => {
      r.db(database).tableList().run(conn).then(tbs => {
        if (tbs.indexOf(tableName) === -1) {
          Debug.highlight(`Table ${tableName}, created in the ${database} database!`);
          r.db(database).tableCreate(tableName).run(conn);
        }
      });
    });
  }
}

export default FoxbitMigration;
