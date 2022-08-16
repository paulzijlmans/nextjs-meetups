import { MongoClient, ObjectId } from 'mongodb';

let client;

async function getMeetupsCollection() {
  client = await MongoClient.connect(process.env.MONGO_DB_URI);
  const db = client.db();
  return db.collection('meetups');
}

export async function getMeetups() {
  const meetupsCollection = await getMeetupsCollection();
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return meetups;
}

export async function getMeetupIds() {
  const meetupsCollection = await getMeetupsCollection();
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return meetupIds;
}

export async function getMeetup(meetupId) {
  const meetupsCollection = await getMeetupsCollection();
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return meetup;
}

export async function saveMeetup(meetup) {
  const meetupsCollection = await getMeetupsCollection();
  const result = await meetupsCollection.insertOne(meetup);
  client.close();
  return result;
}
