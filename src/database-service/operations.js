import r from 'rethinkdb';
import enviroment from '../../enviroment/enviroment';

class Operations {
  openDbConnection() {
    return r.connect(enviroment.dbConnection);
  }

  getCandlesByTime(table, qnt, callBack) {
    return this.openDbConnection().then(conn => {
      r.table(table)
        .orderBy(r.desc('time'))
        .limit(qnt)
        .run(conn, callBack);
    });
  }

  onInsert(table, filter, callBack) {
    this.openDbConnection().then(conn => {
      const changes = r.table(table).changes();
      if (filter !== null) changes.filter(filter);

      changes.run(conn, (err, cursor) => {
        if (err) throw err;

        cursor.each((error, row) => {
          if (error) throw error;

          if (row < 0) {
            row.close();
            return false;
          } else if (row.old_val === null) {
            callBack(row.new_val);
          }
        });
      });
    });
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
