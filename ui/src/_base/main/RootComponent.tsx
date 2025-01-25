/**
* Copyright Super iPaaS Integration LLC, an IBM Company 2024
*/

import styled from "styled-components";
import { HeaderComponent } from "../header/HeaderComponent.tsx";
import { HomeComponent } from '../../Home/HomeComponent.tsx';


const MainSection = styled.main`
    width: 100vw;
`;

export const RootComponent = () => {

  return (
    <div className='relative flex flex-col h-screen'>
      <HeaderComponent />
      <div className="flex relative w-full h-full pl-12 pt-12">
        <MainSection className="relative !w-full h-full">
          <HomeComponent />
        </MainSection>
      </div>
    </div>
  )
}
