var sqlMap = {
  user: {
    add: 'insert into testuser (name, account, pass,email,phone,card,birth,sex) values (?,?,?,?,?,?,?,?)',
    select_name: 'select * from testuser',
    update_user: 'update testuser set'
  }
}

module.exports = sqlMap;
