import React , {useState, useEffect} from 'react'

const HomePage = ({user}) => {
  return(
    <>
    <div>
      <h1>Hola {user.username}, Bienvenido.</h1>
    </div>
    </>
  );
}

export default HomePage;