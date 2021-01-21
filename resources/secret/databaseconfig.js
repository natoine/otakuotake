const dbuser = process.env.userdb || "username" ;
const dbpass = process.env.pwddb || "userpwd";
const dbpath = process.env.dbpath || "dbpath" ;

module.exports = {
    'url' : `mongodb+srv://${dbuser}:${encodeURIComponent(dbpass)}@${dbpath}?retryWrites=true&w=majority` 
}