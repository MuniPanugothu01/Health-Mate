// // AuthForm.jsx
// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const AuthForm = ({ onClose, onLogin }) => {
//   const navigate = useNavigate();

//   const [stage, setStage] = useState("signin"); // 'signin' -> 'signup'
//   const [userType, setUserType] = useState("user");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Email and password are required.");
//       return;
//     }

//     if (stage === "signin") {
//       if (
//         (userType === "user" || userType === "doctor") &&
//         (!firstName || !lastName || !gender)
//       ) {
//         alert("Please fill in all personal details.");
//         return;
//       }

//       setStage("signup"); // move to final step
//     } else {
//       // FINAL LOGIN STEP
//       alert(`Logged in successfully as ${userType}!`);

//       // optional: still notify parent if it passed onLogin
//       if (onLogin) onLogin(userType);

//       // 🔁 Redirect based on role (no App.jsx changes needed)
//       if (userType === "doctor") {
//         navigate("/doctor");
//       } else if (userType === "admin") {
//         navigate("/admin");
//       } else {
//         // treat "user" as your public user interface (home)
//         navigate("/");
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//         {/* Close Icon */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-red-600 hover:text-red-800 cursor-pointer"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-center">
//           {stage === "signin" ? "Sign In" : "Sign Up"} as {userType}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {stage === "signin" && userType !== "admin" && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 w-full border px-3 py-2 rounded-md"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   className="mt-1 w-full border px-3 py-2 rounded-md"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Gender
//                 </label>
//                 <select
//                   className="mt-1 w-full border px-3 py-2 rounded-md"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               className="mt-1 w-full border px-3 py-2 rounded-md"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               className="mt-1 w-full border px-3 py-2 rounded-md"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {stage === "signin" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Select Role
//               </label>
//               <div className="flex gap-4 mt-1">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="user"
//                     checked={userType === "user"}
//                     onChange={(e) => setUserType(e.target.value)}
//                   />
//                   <span>User</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="doctor"
//                     checked={userType === "doctor"}
//                     onChange={(e) => setUserType(e.target.value)}
//                   />
//                   <span>Doctor</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name="userType"
//                     value="admin"
//                     checked={userType === "admin"}
//                     onChange={(e) => setUserType(e.target.value)}
//                   />
//                   <span>Admin</span>
//                 </label>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             {stage === "signin" ? "Continue" : "Log In"}
//           </button>
//         </form>

//         {stage === "signup" && (
//           <div className="mt-4 text-center">
//             <button
//               onClick={() => setStage("signin")}
//               className="text-blue-600 hover:underline"
//             >
//               Go Back to Edit Details
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

// AuthForm.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onClose, onLogin }) => {
  const navigate = useNavigate();

  const [stage, setStage] = useState("signin"); // 'signin' -> 'signup'
  const [userType, setUserType] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    if (stage === "signin") {
      if (
        (userType === "user" || userType === "doctor") &&
        (!firstName || !lastName || !gender)
      ) {
        alert("Please fill in all personal details.");
        return;
      }

      setStage("signup"); // move to final step
    } else {
      // ✅ Save session data
      const userData = {
        userType,
        firstName,
        lastName,
        gender,
        email,
      };

      sessionStorage.setItem("authUser", JSON.stringify(userData));

      alert(`Logged in successfully as ${userType}!`);

      if (onLogin) onLogin(userType);

      // 🔁 Redirect based on role
      if (userType === "doctor") {
        navigate("/doctor");
      } else if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-600 hover:text-red-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {stage === "signin" ? "Sign In" : "Sign Up"} as {userType}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {stage === "signin" && userType !== "admin" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border px-3 py-2 rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border px-3 py-2 rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  className="mt-1 w-full border px-3 py-2 rounded-md"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full border px-3 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full border px-3 py-2 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {stage === "signin" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="user"
                    checked={userType === "user"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span>User</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="doctor"
                    checked={userType === "doctor"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span>Doctor</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={userType === "admin"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {stage === "signin" ? "Continue" : "Log In"}
          </button>
        </form>

        {stage === "signup" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setStage("signin")}
              className="text-blue-600 hover:underline"
            >
              Go Back to Edit Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
