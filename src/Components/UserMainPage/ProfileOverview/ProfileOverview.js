import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import './ProfileStyle.css';
import ProfileOverviewItem from './ProfileOverviewItem';
import PersonalInfoModal from './Actions/PersonalInfoModal';
import { GET_BY_ID, CHECK_ROLE, CheckIfLogged } from '../../../Clients/Client';

export default function ProfileOverview(props) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchAPI() {
      try
      {
        let response;
        var role = CHECK_ROLE();

        if(CheckIfLogged() === false)
          return;

        if (typeof(role) !== 'undefined')
          response = await GET_BY_ID(`Employee`);          
        else
          response = await GET_BY_ID(`Patient`);

        setProfile(response.data);
      }
      catch (error)
      {
        console.log(`Error while trying to retrieve profile data. Message: ${error}`);
      } 
    } 
    fetchAPI();
    
  }, []);
  
  return (
    <div>     
      <div className={"profileBlock"} >
          <h2 className={"profileTitle"}>{profile.name} {profile.surname}</h2>                 
          <div className={"personalDetails"}>                    
            <Table>
              <TableBody>
                <ProfileOverviewItem title={"Asmens kodas:"} data={profile.personalCode}/>                  
                <ProfileOverviewItem title={"Gimimo data:"} data={profile.birthDate ? profile.birthDate.split("T")[0] : null}/>                  
                <ProfileOverviewItem title={"Pašto adresas:"} data={profile.email}/>                  
                <ProfileOverviewItem title={"Gyvenamoji vieta:"} data={profile.address}/>                  
              </TableBody>
            </Table>
            <div className={"personalDetailsLearnMore"}>
              <PersonalInfoModal name={profile.name} surname={profile.surname} birthDate={profile.birthDate ? profile.birthDate.split("T")[0] : null} 
              email={profile.email} address={profile.address} personalCode={profile.personalCode} mobile={profile.phone} familyDoc={profile.familyDoc}/>             
            </div>                     
          </div>   
      </div>       
    </div>
  );
}