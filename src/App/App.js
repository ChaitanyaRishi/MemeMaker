import React from 'react';
import { Meme} from '../Meme/Meme';
import { Switch, Route} from 'react-router-dom';
import {MemeGenerated} from '../MemeGenerated/MemeGenerated';
require('dotenv').config();

export const App = () => {
  return (
    <div>
      <h1>Make Memes!</h1>
      <Switch>
        <Route exact path='/'>
          <Meme />
        </Route> 
        <Route path='/generated'>
          <MemeGenerated />
        </Route>       
      </Switch>
    </div>
  );
};