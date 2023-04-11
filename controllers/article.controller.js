const db = require("../firestore/firestore")

const articleRef = db.collection('articles');
const storage = require('./storage.controller')

exports.save = async (data, image) => {
       try {
              const path = await storage.saveImage(image);
              data.image = path;
              const res = await articleRef.add(data);
              return { res };
       } catch (error) {
              return { error };
       }
}



