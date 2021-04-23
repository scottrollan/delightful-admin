import axios from 'axios';
import { messagingToken, messagePayload } from './index';
// import $ from 'jquery';

const url = 'https://fcm.googleapis.com/fcm/send';
const audioURL = '';

const iconURL =
  'https://firebasestorage.googleapis.com/v0/b/delightful-dog-cloud-functions.appspot.com/o/assets%2FdogHeadset.jpg?alt=media&token=b3020357-c63e-4257-80ee-2a30502189b6';

const authToken = process.env.REACT_APP_MESSAGING_SERVER_KEY;

export const newHelpChat = async (messageDetails) => {
  let deviceToken = messagingToken;
  const data = {
    to: deviceToken,
    notification: {
      title: `INCOMING CHAT from ${messageDetails.userName}`,
      body: 'check console for messagePayload',
      icon: iconURL,
    },
  };
  const options = {
    headers: {
      Authorization: `key=${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(url, { ...data }, options)
    .then((response) => {
      //Object.keys(response) -> data, status, statusText, headers, config, request
      //Object.keys(response.data) -> multicast_id, success, failure, canonical_ids, results
      const successFailure = response.data.success ? 'SUCCESS' : 'FAILED';
      console.log(`Message send ${successFailure}.`);
      // $('#chatButton').show();
      // $('#chatAnchor').attr('href', iconURL);
    })
    .catch((error) => {
      console.log(error);
    });
  // setTimeout();
};
