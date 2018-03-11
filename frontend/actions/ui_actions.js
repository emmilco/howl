export const REMOVE_FORM = "REMOVE_FORM";
export const DISPLAY_FORM = "DISPLAY_FORM";
export const TOGGLE_MENU = "TOGGLE_MENU";
export const CLEAR_NEW_ARTICLE = "CLEAR_NEW_ARTICLE";
export const CLEAR_MENU = "CLEAR_MENU";

export const removeForm = () => {
  return {
    type: REMOVE_FORM
  };
};

export const displayForm = (form) => {
  return {
    type: DISPLAY_FORM,
    form
  };
};

export const toggleMenu = (menu) => {
  return {
    type: TOGGLE_MENU,
    menu
  };
};

export const clearNewArticle = () => {
  return {
    type: CLEAR_NEW_ARTICLE
  };
};

export const clearMenu = () => {
  return {
    type: CLEAR_MENU
  };
};
