const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    projectId: "productdb-eaa0c",
    keyFilename: "productdb-eaa0c-firebase-adminsdk-jgsmm-e0d9b194c0.json"
});

let bucketName = "gs://productdb-eaa0c.appspot.com";

exports.fireBaseStorage = async(request, response, next) => {
    try {
        console.log("=====================inside try");

        await storage.bucket(bucketName).upload(path.join(__dirname, '../', "./public/images/") + request.file.filename, {
            gzip: true,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: "abcddcba"
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
    //    console.log(request.file.filename);
    next();
}