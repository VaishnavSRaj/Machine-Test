import React, { useState } from "react";

const UserRecord = () => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTxt, setSearchTxt] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("male");
  const [isEmpty, setIsEmpty] = useState(true);
  const [isEmailVaild, setEmailValid] = useState(true);

  // Search
  function filterData(searchTxt, users) {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTxt.toLowerCase())
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!id || !name || !dob || !email || !salary) {
      setIsEmpty(false);
      return;
    }

    setIsEmpty(true);

    if (!email.includes("@")) {
      setEmailValid(false);
      setEmail("");
      return;
    }
    setEmailValid(true);

    // Create user record
    const newUser = {
      id,
      name,
      dob,
      email,
      salary,
      gender,
    };

    setUsers([...users, newUser]);
    setFilteredData([...users, newUser]);

    setId("");
    setName("");
    setDob("");
    setEmail("");
    setSalary("");
    setGender("male");
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];

    setId(userToEdit.id);
    setName(userToEdit.name);
    setDob(userToEdit.dob);
    setEmail(userToEdit.email);
    setSalary(userToEdit.salary);
    setGender(userToEdit.gender);

    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleDelete = (index) => {
    const updatedUsers = [...filteredData];
    updatedUsers.splice(index, 1);
    setFilteredData(updatedUsers);
  };

  return (
    <div className="flex">
      <div className="max-w-lg mx-auto mt-5 flex bg-slate-400 p-5 w-a rounded-2xl">
        <form onSubmit={handleSubmit} className="mb-4">
          <h2 className="m-2 p-3 from-neutral-950">USER FORM</h2>
          <div className="p-2">
            <label For="id">ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>

          <div className="p-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>

          <div className="p-2">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>

          <div className="p-2">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>

          {!isEmailVaild && (
            <p className="text-red-600">Invalid email address!</p>
          )}

          <div className="p-2">
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="border border-gray-300 p-1"
            />
          </div>

          <div className="w-auto mt-4">
            <span className="p-2">Gender:</span>
            <label>
              <input
                className="p-2"
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label className="px-3">
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
          </div>
          {!isEmpty && <p className="text-red-600">All fields required*</p>}
          <button
            type="submit"
            className="font-poppins bg-purple-600 text-white hover:bg-black p-2 rounded-lg px-4 py-2 mt-2"
          >
            Create
          </button>
        </form>

        <div className=" pt-[93px] m-1 mx-3  ">
          <input
            type="Text"
            className=" w-56 h-9 px-3 font-poppins mb-2  focus:outline-orange-300 border-solid border-2 border-gray-200 "
            placeholder="Enter a name"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />

          <button
            className=" font-poppins  bg-purple-600 text-white hover:bg-black px-4 py-2 mt-2 rounded-lg "
            onClick={() => {
              const Data = filterData(searchTxt, users);

              setFilteredData(Data);
              {
              }
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className=" mx-auto mt-5">
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">
                Date of Birth
              </th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Salary</th>
              <th className="border border-gray-400 px-4 py-2">Gender</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={user.id}>
                <td className="border border-gray-400 px-4 py-2">{user.id}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">{user.dob}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.salary}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.gender}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-green-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserRecord;
