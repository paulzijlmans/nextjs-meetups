import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  function addMeetupHandler(newMeetupData) {
    console.log(newMeetupData);
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;