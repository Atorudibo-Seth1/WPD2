const nedb = require('nedb');
const path = require('path');
const { title } = require('process');

class Goals {
    constructor(dbFilePath) {
        if(dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else{
            this.db = new nedb();
        }
    }

    viewAllGoals(){
        return new Promise((resolve, reject) => {
            this.db.find({}, {category: 1, title: 1, description: 1, startdate: 1, enddate: 1}, function(err, goals) {
                if(err) {
                    reject(err);
                } else {
                    resolve(goals);
                    console.log("Returns: ", goals);
                }
            })
        })
    }

    newGoal(category, title, description, startdate, enddate){
        if(category && title && description && startdate, enddate) {
            this.db.insert({category:category, title: title, description: description, startdate: startdate, enddate: enddate});
        } else{
            console.log("There might be an error!");
        }
    }

    removeGoal(title) {
        if (this.db.find({title: title})) {
            this.db.remove({title: title})
            console.log('Your goal ' + title + ' has been removed')
        } else {
            console.log('Goal not found')
        }
    }

    goalUpdate(title, description) {
        if(this.db.find({title: title})) {
            this.db.update({title: title}, {$set: {description: description}});
            console.log("Your goal has been updated successfully")
        } else {
            console.log("Goal with that title cannot be found!")
        }
    }

    
}


module.exports = Goals;