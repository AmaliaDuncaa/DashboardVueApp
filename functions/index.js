const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const {
  Storage
} = require('@google-cloud/storage');
let gcs = new Storage();

const spawn = require('child-process-promise').spawn;

exports.onFileChange = functions.storage.object().onFinalize(event => {
  console.log(event);
  const bucket = event.bucket
  const contentType = event.contentType;

  const filePath = event.name;
  console.log('file detected')

  if (path.basename(filePath).startsWith('resized@')) {
    console.log('already resized this file')
    return;

  }

  const destBucket = gcs.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = {
    contentType: contentType
  }
  return destBucket.file(filePath).download({

    destination: tmpFilePath
  }).then(() => {
    return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath])

  }).then(() => {
    return destBucket.upload(tmpFilePath, {

      destination: 'photos/resized@500x500' + path.basename(filePath),

      metadata: metadata
    })

  }).then(() => {
    return spawn('convert', [tmpFilePath, '-resize', '200x200', tmpFilePath])
  }).then(() => {

    return destBucket.upload(tmpFilePath, {
      destination: 'photos/resized@200x200' + path.basename(filePath),
      metadata: metadata

    })
  })

});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
