import React, { useState, useEffect } from 'react';

export default function FetchingDataFromAnApi() {
  const [pageNumber, setPageNumber] = useState(1);
  const API_URL = `https://api.randomuser.me/?page=${pageNumber}`;
  const [userInformation, setUserInformation] = useState([]);

  const fetchNextUser = () => {
    setPageNumber(pageNumber + 1);
  };

  async function fetchApiData() {
    try {
      let response = await fetch(API_URL);
      let data = await response.json();
      const { results, info } = data;
      const [result] = results;
      const userName = `${result.name.first} ${result.name.last}`;
      const userImage = result.picture.large;
      const randomUserInfomation = { userName, userImage };
      return randomUserInfomation;
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchApiData().then((randomUserInfomation) => {

      const updatedUserInfos = [
        ...userInformation,
        randomUserInfomation,
      ]
      setUserInformation(updatedUserInfos)
    });
  }, [pageNumber]);

  return (
    <>
        <div className="userCards">
          {userInformation.length > 0 ? (
            userInformation.map((item, i) => (
              <div key={i + 1} className="userCard">
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
