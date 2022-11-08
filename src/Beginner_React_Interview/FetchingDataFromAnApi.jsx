import React, { useState, useEffect } from 'react';

export default function FetchingDataFromAnApi() {
  const API_URL = 'https://api.randomuser.me/';
  const [userInformation, setUserInformation] = useState({});

  /**
      fetch the api and display as string.
     to fetch is to send an http request from data and wait fro response. 
     the promise is the eventual completion or failure of asynch operation.
     get something, wait fro response, the resopnse either succesful and I will get the data
     or faillure then have a error message. 
     */
  async function fetchApiData() {
    try {
      let response = await fetch(API_URL);
      let data = await response.json();
      const { results, info } = data;
      const randomUserInfomation = results.map((item) => ({
        randomUserName: item.name.first + ' ' + item.name.last,
        randomUserImage: item.picture.large,
      }));
      return randomUserInfomation;
    } catch (err) {
      console.eroor(err.message);
    }
  }

  useEffect(() => {
    fetchApiData().then((randomUserInfomation) => {
      let dataToUpdate = {};
      randomUserInfomation.map((item) => {
        dataToUpdate = {
          userName: item.randomUserName,
          userImage: item.randomUserImage,
        };
        return dataToUpdate;
      });
      setUserInformation(dataToUpdate);
    });
  }, []);

  return (
    <div className="userCard">
      <img src={userInformation.userImage} alt="user" />
      <p>{userInformation.userName}</p>
    </div>
  );
}
