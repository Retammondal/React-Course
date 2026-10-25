function App() {
  const [user, setUser] = useState({
    name: "Retam",
    address: { city: "Kolkata" }
  });

  const [count, setCount] = useState(0);

  function changeCity() {
    user.address.city = "Mumbai";
    setUser(user);
  }

  function increment() {
    setCount(prev => prev + 1);
  }

  return (
    <>
      <p>City: {user.address.city}</p>
      <p>Count: {count}</p>

      <button onClick={changeCity}>
        Change City
      </button>

      <button onClick={increment}>
        Increment
      </button>
    </>
  );
}