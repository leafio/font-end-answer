import { useState } from "react";
import { User } from "../apis";
import { GenderFilter } from "./GenderFilter";

export type ListItem = {
  country: string;
  users: User[];
};

export function CountryList({ list }: { list: ListItem[] }) {
  const [active, setActive] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  return (
    <div className="country-list">
      {list.map((item) => (
        <div key={item.country}>
          <div
            className="country-name flex-row-between"
            onClick={() => {
              if(item.country===active){setActive('')}else{
                setActive(item.country);
              }
          
            }}
          >
            <div>{item.country}</div>
            {item.country === active && (
              <GenderFilter value={filterGender} onChange={setFilterGender} />
            )}
          </div>
          {item.country === active &&
            item.users
              .filter(
                (user) => filterGender === "all" || user.gender === filterGender
              )
              .map((user) => (
                <div key={user.login.uuid} className="user">
                  <div className="name">
                    {user.name.first} {user.name.last}
                  </div>
                  <div className="flex-row-between">
                    <div className="gender">{user.gender}</div>
                    <div className="regist-date">{new Date( user.registered.date).toLocaleDateString()}</div>
                  </div>
                  <div className="location">
                    {user.location.city},{user.location.state}
                  </div>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
}
