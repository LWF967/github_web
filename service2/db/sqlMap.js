var sqlMap = {
  user: {
    add: 'insert into user (userId, userName, userPwd, myPhoto) values (?,?,?,?)',
    select_name: 'select * from user',
    update_user: 'update user set'
  }
}

module.exports = sqlMap;
