import React, { useState, useEffect } from 'react';

export default function FetchingDataFromAnApi() {
  const API_URL = 'https://api.randomuser.me/?results=4';
  const [usersInformation, setUsersInformation] = useState([]);

  async function fetchApiData() {
    try {
      let response = await fetch(API_URL);
      let data = await response.json();
      const { results, info } = data;
      const randomUsersInfomation = results.map((item) => {
        return {
          randomUserName: item.name.first + ' ' + item.name.last,
          randomeUserPicture: item.picture.large,
        };
      });
      return randomUsersInfomation;
    } catch (err) {
      console.eroor(err.message);
    }
  }

  useEffect(() => {
    fetchApiData().then((randomUserInfomation) => {
      let dataToUpdate = [];
      randomUserInfomation.map((item, i) => {
        dataToUpdate.push({
          id: i + 1,
          userName: item.randomUserName,
          userImage: item.randomeUserPicture,
        });
        return dataToUpdate;
      });

      setUsersInformation(dataToUpdate);
      // setUsersInformation([...usersInformation].map(obj => {
      //     // console.log(obj)
      //     console.log(dataToUpdate)
      //     return { ...obj, ...dataToUpdate }

      // }))
      // console.log(usersInformation)

      // setUsersInformation((userInformation) => ({
      //     ...userInformation,
      //     ...dataToUpdate,
      // }));
    });
  }, []);

  return (
    <div className="usersCards">
      {usersInformation.length > 0 ? (
        usersInformation.map((item, i) => (
          <div key={i} className="userCard">
            <img src={item.userImage} alt="user" />
            <p>{item.userName}</p>
          </div>
        ))
      ) : (
        <p>no data to display</p>
      )}
    </div>
  );
}
