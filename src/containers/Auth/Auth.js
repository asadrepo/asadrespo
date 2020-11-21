

export const AuthGuard = () => {
    const userStr = localStorage.getItem('user');
    return !!userStr;
};

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return userStr;
    else return null;
}

export const isLoginFirstTime = () => {
    return (getUserObject().is_first_login) ? true : false;
}

export const getUserId = () => {
    const userStr = localStorage.getItem('user');
    var user_object = JSON.parse(userStr);
    if(userStr) return user_object.id;
    else return null;
}

export const getUserObject = () => {
    const userStr = localStorage.getItem('user');
    var user_object = JSON.parse(userStr);
    if(userStr) return user_object;
    else return null;
}


export const isSubscribed = () => {
    return true;
    // const userStr = localStorage.getItem('user');
    // var user_object = JSON.parse(userStr);
    // if(userStr) return user_object.is_premium;
    // else return null;
}

export const getToken = () => {
   // return '977746ca9e1fe6471aeaf7e8c708cb46226f38a1';
    return localStorage.getItem('_token') || null;
}

export const setOnlyUserObject = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const setUserStorage = (token, user) => {
    localStorage.setItem('_token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeUserStorage = () => {
    localStorage.removeItem('_token');
    localStorage.removeItem('user');
}