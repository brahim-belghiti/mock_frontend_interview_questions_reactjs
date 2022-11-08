import React, { useState, useEffect } from 'react';

export default function FetchingDataFromAnApi() {
  const [pageNumber, setPageNumber] = useState(5);
  const API_URL = `https://api.randomuser.me/?page=${pageNumber}`;
  const [userInformation, setUserInformation] = useState([]);

  const fetchNextUser = () => {
    setPageNumber(pageNumber + 1);
     console.log(userInformation);
     
  };

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
      setUserInformation((userInformation) => ({
        ...userInformation,
        ...dataToUpdate,
      }));
      // setUserInformation(dataToUpdate);
    });
  }, [pageNumber]);

  return (
    <>
      <div className="userCards">
        {userInformation.length > 0 ? (
          userInformation.map((item, i) => (
            <div key={i} className="userCard">
              <img src={item.userImage} alt="user" />
              <p>{item.userName}</p>
            </div>
          ))
        ) : (
          <p>no data to display</p>
        )}
      </div>
      <button onClick={fetchNextUser}>add new user</button>
    </>
  );
}
