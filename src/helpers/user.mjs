export const user = {
    _userName: '',

    getUserName: () => {
        return user._userName;
    },

    setUserName: (name) => {
        user._userName = name;
    },
}