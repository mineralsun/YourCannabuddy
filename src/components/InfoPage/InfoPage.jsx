import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>Not sure I need this page or what I should put here?</p>
      <a href="https://www.flaticon.com/free-icons/hemp" title="Hemp icons">Hemp icons created by Freepik - Flaticon</a>
    </div>
  );
}

export default InfoPage;
