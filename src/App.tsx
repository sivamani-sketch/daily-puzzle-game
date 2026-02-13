import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login Successful 🎉");
    } catch (error) {
      console.error(error);
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Login with Google
      </button>
    </div>
  );
}

export default App;
