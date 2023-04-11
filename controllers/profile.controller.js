const db = require("../firestore/firestore")

const profileRef = db.collection('profiles');

exports.save = async (data) => {
       try {
              const res = await profileRef.add(data);
              return res;
       } catch (error) {
              throw new Error(error);
       }
}



