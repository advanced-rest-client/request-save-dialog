var DatabaseHelper = {};
DatabaseHelper.getDatabase = function() {
  return new PouchDB('legacy-projects');
};
DatabaseHelper.createProjects = function() {
  var db = DatabaseHelper.getDatabase();
  var docs = [{
    name: 'Demo project',
    order: 0,
    _id: 'demo-project'
  }, {
    name: 'Other project',
    order: 1,
    _id: 'other-project'
  }];
  return db.bulkDocs(docs)
  .then(res => {
    for (var i = 0; i < res.length; i++) {
      if (!res[i].ok) {
        if (res[i].status !== 409) {
          throw new Error(res[i].message);
        }
      }
    }
  });
};
DatabaseHelper.deleteProjects = function() {
  var db = DatabaseHelper.getDatabase();
  return db.destroy();
};
