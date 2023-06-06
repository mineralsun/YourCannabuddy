import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <h1>Everett Butler:</h1>
        <ul>
        - GitHub: https://github.com/mineralsun
        </ul>
        <ul>
        - LinkedIn: https://www.linkedin.com/in/everett-james-butler/
        </ul>
        <ul>
        - Email: everettjamesbutler@gmail.com
        </ul>
      <h4>I would like to thank Chris Black, Marc McCarthy, and all of my Tanzanite Cohort classmates for helping me on this project and along my software development journey!</h4>
      <a href="https://www.flaticon.com/free-icons/hemp" title="Hemp icons">Hemp icons created by Freepik - Flaticon</a>
      </div>
    </div>
  );
}

export default AboutPage;
