// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import userLogo from "../assets/user.jpg";

// const PopularAuthors = () => {
//   const [popularUser, setPopularUser] = useState([]);

//   const getAllUsers = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/user/all-users`,
//       );
//       if (res.data.success) {
//         setPopularUser(res.data.users);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col space-y-4 items-center">
//           <h1 className="text-3xl md:text-4xl font-bold p-10">
//             Popular Authors
//           </h1>
//           <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
//         </div>
//         <div className="flex items-center justify-around my-10 px-4 md:px-0">
//           {popularUser?.slice(0, 3).map((user, index) => {
//             return (
//               <div key={index} className="flex flex-col gap-2 items-center">
//                 <img
//                   src={user.photoUrl || userLogo}
//                   alt=""
//                   className="rounded-full h-16 md:w-33 md:h-32"
//                 />
//                 <p className="font-semibold">
//                   {user.firstName} {user.lastName}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopularAuthors;



import axios from "axios";
import React, { useEffect, useState } from "react";
import userLogo from "../assets/user.jpg";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/all-users`,
      );
      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Popular Authors
          </h1>
          <hr className="w-20 border-2 border-red-500 rounded-full" />
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 place-items-center">
          {popularUser?.slice(0, 3).map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-3 text-center"
              >
                <img
                  src={user.photoUrl || userLogo}
                  alt=""
                  className="rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover"
                />
                <p className="font-semibold text-sm sm:text-base dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularAuthors;
