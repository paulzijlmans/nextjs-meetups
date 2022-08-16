import { saveMeetup } from '../../utils/mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    saveMeetup(data);
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
