import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CountryList, ListItem } from "./components/CountryList";
import { listUsers, User } from "./apis";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<ListItem[]>([]);
  useEffect(() => {
    listUsers().then((res) => {
      const list: ListItem[] = [];
      res.forEach((user) => {
        const target = list.find(
          (item) => item.country === user.location.country
        );
        if (!target) {
          list.push({
            country: user.location.country,
            users: [user],
          });
        } else {
          target.users.push(user);
          target.users.sort(
            (a, b) =>
              new Date(b.registered.date).valueOf() -
              new Date(a.registered.date).valueOf()
          );
        }
      });
      list.sort((x, y) => y.users.length - x.users.length);
      console.log(list);
      setData(list);
      setUsers(res);
    });
  }, []);
  return (
    <div >
  
        <CountryList list={data} />
     
    </div>
  );
}

export default App;
