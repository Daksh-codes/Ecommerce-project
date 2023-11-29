// GetAddress.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useUserStore from "../store";
import axiosInstance from "../axios";

const GetAddress = () => {
  const { user, setUser } = useUserStore()
  const [address, setAddress] = useState(user.address || "");
  const [mobile, setMobile] = useState(user.mobile || "");


  const updateDetails = async () => {
    try {
      if (!address) {
        toast.error("Address missing");
      }
      if (!mobile) {
        toast.error("Mobile number missing");
      }
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const res = await axiosInstance.put(
        `/api/users/update/${user._id}`,
        { address, mobile },
        config
      );
      console.log(res.status);
      if (res.status === 200) {
        setUser({ ...user, address, mobile });
        console.log(user);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(address);
  };

  return (
    <div className="">
      <div>
        <div className="flex gap-4">
          <label htmlFor="address" className="text-gray-600">
            Address :{" "}
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border px-1 border-gray-900 text-gray-900 text-sm mt-2 mb-4"
            cols="27.5"
            rows="3"
            placeholder="Enter address to deliver product "
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="address" className="text-gray-600">
            Mobile no. :{" "}
          </label>
          <input
            type="Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border px-1 text-gray-900 border-gray-900 text-sm mt-2 mb-4"
            required={true}
            //placeholder="9321994380"
          />
        </div>

        <button
          className="bg-black hover:bg-black/80  my-4 text-bg px-4 py-1 "
          onClick={updateDetails}
        >
          Update details
        </button>
      </div>
    </div>
  );
};

export default GetAddress;
