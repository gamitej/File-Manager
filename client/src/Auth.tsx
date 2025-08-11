import api from "./api";
import { useReducer } from "react";

type State = {
  username: string;
  password: string;
  isLoginPage: boolean;
  error: string;
};

type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "TOGGLE_LOGIN" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_RESET_USER_INFO" };

const initialState: State = {
  username: "",
  password: "",
  isLoginPage: true,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_LOGIN":
      return { ...state, isLoginPage: !state.isLoginPage };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_RESET_USER_INFO":
      return { ...state, username: "", password: "" };
    default:
      return state;
  }
}

const Auth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiReqData = {
      username: state.username,
      password: state.password,
    };

    try {
      if (state.isLoginPage) {
        const res = await api.post("/login", apiReqData);

        localStorage.setItem("token", res?.data?.token);
        window.location.reload();
      } else {
        await api.post("register", apiReqData);
        dispatch({ type: "TOGGLE_LOGIN" });
        dispatch({ type: "SET_RESET_USER_INFO" });
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.error || "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-blue-500">
          {state.isLoginPage ? "Login" : "Register"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USERNAME", payload: e.target.value })
          }
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          className="border p-2 w-full"
          required
        />
        {state.error && <div className="text-red-500">{state.error}</div>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {state.isLoginPage ? "Login" : "Register"}
        </button>

        <button
          type="button"
          onClick={() => {
            dispatch({ type: "TOGGLE_LOGIN" });
            dispatch({ type: "SET_RESET_USER_INFO" });
          }}
          className="text-blue-400 underline w-full hover:text-red-400"
        >
          {state.isLoginPage ? "Create an account" : "back to login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
