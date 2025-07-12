"use client";

import React, { useState } from "react";

// Mock data for swap requests
const MOCK_REQUESTS = [
  {
    id: 1,
    user: {
      name: "Marc Demo",
      profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 3.9,
    },
    skillsOffered: ["Java Script"],
    skillsWanted: ["PhotoShop"],
    status: "Pending",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.2,
    },
    skillsOffered: ["UI Design"],
    skillsWanted: ["React"],
    status: "Rejected",
  },
  {
    id: 3,
    user: {
      name: "Joe Wills",
      profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.0,
    },
    skillsOffered: ["Python"],
    skillsWanted: ["Manager"],
    status: "Accepted",
  },
  {
    id: 4,
    user: {
      name: "Sarah Johnson",
      profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4.5,
    },
    skillsOffered: ["Node.js", "MongoDB"],
    skillsWanted: ["AWS", "DevOps"],
    status: "Pending",
  },
  {
    id: 5,
    user: {
      name: "Emma Wilson",
      profilePhoto: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 4.8,
    },
    skillsOffered: ["React", "TypeScript"],
    skillsWanted: ["UI Design", "UX Research"],
    status: "Pending",
  },
];

const STATUSES = ["All", "Pending", "Accepted", "Rejected"];
const REQUESTS_PER_PAGE = 2;

const SwapRequestsPage = () => {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter and search logic
  const filteredRequests = requests.filter((req) => {
    const matchesStatus =
      statusFilter === "All" || req.status === statusFilter;
    const matchesSearch =
      req.user.name.toLowerCase().includes(search.toLowerCase()) ||
      req.skillsOffered.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      req.skillsWanted.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / REQUESTS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (page - 1) * REQUESTS_PER_PAGE,
    page * REQUESTS_PER_PAGE
  );

  // Accept/Reject handlers
  const handleStatusChange = (id: number, newStatus: "Accepted" | "Rejected") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Swap Requests</h1>
        {/* Filter and search */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center justify-between">
          <div className="flex gap-2">
            {STATUSES.map((status) => (
              <button
                key={status}
                className={`px-4 py-1 rounded-full border ${
                  statusFilter === status
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                  setStatusFilter(status);
                  setPage(1);
                }}
              >
                {status}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by name or skill..."
            className="border border-gray-300 rounded px-3 py-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        {/* Requests list */}
        {paginatedRequests.length === 0 ? (
          <div className="text-center text-gray-500">No swap requests found.</div>
        ) : (
          paginatedRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col sm:flex-row items-center gap-6"
            >
              <img
                src={req.user.profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="text-xl font-semibold">{req.user.name}</div>
                  <div className="text-sm text-gray-500">rating {req.user.rating}/5</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-green-700 font-medium">Skills Offered =&gt;</span>
                  {req.skillsOffered.map((skill, i) => (
                    <span key={i} className="bg-blue-100 px-2 py-1 rounded-full text-blue-700 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-blue-700 font-medium">Skills Wanted =&gt;</span>
                  {req.skillsWanted.map((skill, i) => (
                    <span key={i} className="bg-green-100 px-2 py-1 rounded-full text-green-700 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-semibold text-lg">Status</span>
                  <span
                    className={`text-lg font-bold ${
                      req.status === "Pending"
                        ? "text-gray-500"
                        : req.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                  {req.status === "Pending" && (
                    <>
                      <button
                        className="ml-4 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleStatusChange(req.id, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleStatusChange(req.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded border bg-white"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded border ${
                  page === i + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-300"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded border bg-white"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequestsPage; 