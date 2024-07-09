import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <Container className='content-container'> 
        <Outlet />
      </Container>
    </>
  );
};

export default observer(App);
