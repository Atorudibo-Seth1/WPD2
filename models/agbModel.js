const nedb = require('nedb');
const path = require('path');

class StaffandUsers {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else{
            this.db = new nedb();
        }
    }

    register(name, email, password){
        if(name && email && password) {
            this.db.insert({name: name, email: email, password: password});
        } else{
            console.log("There might be an error!");
        }
    }

    newStaff(name) {
        if(name) {
            this.db.insert({name: name}, function(err, newDoc){
                if(err){
                    console.log('error', err);
                }else{
                    console.log("Document successfully inserted", newDoc);
                }
            })
        } else {
            console.log("Fill all fields");
        } 
    }

    remove(id) {
        if (this.db.find({_id: id})) {
            this.db.remove({_id: id})
            console.log('Staff with id ' + id + ' has been removed')
        } else {
            console.log('Staff not found')
        }
    }

    staffUpdate(id, name) {
        if(this.db.find({_id: id})) {
            this.db.update({_id: id}, {$set: {name: name}});
            console.log("Staff data updated successfully")
        } else {
            console.log("Staff with that ID cannot be found!")
        }
    }

    getAllEntries(){
        return new Promise((resolve, reject) => {
            this.db.find({}, {name: 1, _id: 1}, function(err, entries) {
                if(err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log("Returns: ", entries);
                }
            })
        })
    }
}


module.exports = StaffandUsers;