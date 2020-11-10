var sqlMap = {
  user: {
    add: 'insert into testuser (name, account, pass,email,phone,card,birth,sex) values (?,?,?,?,?,?,?,?)',
    select_name: 'select * from user',
    update_user: 'update user set'
  }
}

module.exports = sqlMap;
