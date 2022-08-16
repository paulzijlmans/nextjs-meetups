import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { getMeetup, getMeetupIds } from '../../utils/mongodb';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name='description' content={props.meetup.description} />
      </Head>
      <MeetupDetail
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const meetups = await getMeetupIds();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const selectedMeetup = await getMeetup(meetupId);

  return {
    props: {
      meetup: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
