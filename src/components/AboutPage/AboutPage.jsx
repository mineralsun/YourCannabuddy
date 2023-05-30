import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <body>
          <h4>“YourCannabudy!” is a cannabis product tracking app that will allow users to log in to a secure profile, add a new product to their “stash”, and also reference and sort through their stash via filters and control through YourCannabuddy.</h4>
          <li>The future of this application would likely include social features, several different organizational or filtering options, product-picture upload, secondary effects, and educational resources as well.</li>
          <li>The main function is to break down the barriers of manually tracking cannabis products and personal data in a physical notebook, and store that information in an accessible and easy-to-use website.</li>
        </body>
      </div>
    </div>
  );
}

export default AboutPage;
