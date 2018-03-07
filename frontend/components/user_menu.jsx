import React from 'react';

const UserMenu = (props) => {
  if (props.openState) {
    return (
      <div id="user_menu">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    );
  }
  return <div></div>;
};

export default UserMenu;
