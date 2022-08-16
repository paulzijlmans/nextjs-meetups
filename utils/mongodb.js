import { MongoClient } from 'mongodb';

let client;

async function getMeetupsCollection() {
  client = await MongoClient.connect(process.env.MONGO_DB_URI);
  const db = client.db();
  return db.collection('meetups');
}

export async function getMeetups() {
  const meetupsCollection = getMeetupsCollection();
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return meetups;
}

export async function saveMeetup(meetup) {
  const meetupsCollection = getMeetupsCollection();
  const result = await meetupsCollection.insertOne(meetup);
  client.close();
  return result;
}
