const dbuser = process.env.userdb || "yourusername" ;
const dbpass = process.env.pwddb || "yourpwd";
const dbpath = process.env.dbpath || "yourdbpath" ;

module.exports = {
    'url' : `mongodb+srv://${dbuser}:${encodeURIComponent(dbpass)}@${dbpath}?retryWrites=true&w=majority` 
}