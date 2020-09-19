import React from "react";
import MessageBox from "./page/MessageBox";
import MoodLabels from "./page/MoodLabels";
import MoodSlider from "./page/MoodSlider";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const moodData = {
  userInfo: {
    userId: '123',
    userName: 'Zen'
  },
  currMood: {
    id: 0,
    percent: 50
  }
};

export const MoodContext = React.createContext(moodData);

function App() {
  return (
    <MoodContext.Provider value={moodData}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <MessageBox />
            </Route>
            <Route path="/moodlabels">
              <MoodLabels />
            </Route>
            <Route path="/moodslider/:id">
              <MoodSlider />
            </Route>
          </Switch>
        </div>
      </Router>
    </MoodContext.Provider>
  );
}

export default App;
