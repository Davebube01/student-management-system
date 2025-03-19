"use client";

import { logout } from "../login/actions";

export default function LogoutButton() {
    return (
      <button 
          onClick={() => logout()}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    );
  }