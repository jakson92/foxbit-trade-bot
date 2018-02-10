import r from 'rethinkdb';
import enviroment from '../../enviroment/enviroment';

class Operations {
  openDbConnection() {
    return r.connect(enviroment.dbConnection);
  }

  insert(table, item) {
    this.openDbConnection().then(conn => {
      r.table(table)
        .insert(item)
        .run(conn);
    });
  }
}

export default Operations;
