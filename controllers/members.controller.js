const db = require("../firestore/firestore")

const memberRef = db.collection('structural-members');
const storage = require('./storage.controller')

exports.save = async (data, image) => {
       try {
              const path = await storage.saveImage(image);
              data.photo = path;
              const res = await memberRef.add(data);
              return { res };
       } catch (error) {
              throw new Error(error);
       }
}

exports.update = async (data, id) => {
       console.log(data)
       try {
              const res = await memberRef.doc(id).update(data);
              return { res };
       } catch (error) {
              throw new Error(error);
       }
}


