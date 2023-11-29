import create from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeUser: () => {
    console.log('Removing user');
    set({ user: null });
    localStorage.removeItem("user");
  },
}));

// Load the user from localStorage during initialization
const storedUser = localStorage.getItem("user");
if (storedUser) {
  useUserStore.setState({ user: JSON.parse(storedUser) });
}
//console.log(storedUser)

export default useUserStore;
