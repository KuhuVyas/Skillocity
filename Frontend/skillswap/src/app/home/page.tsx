"use client";

//import { UserButton } from "@clerk/nextjs";
import { useState, useEffect, ChangeEvent } from "react";

// Define TypeScript interfaces for our data model
interface Professional {
  id: number;
  name: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  availability: string;
}

// Mock data for professionals
const PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: "Marc Demo",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["React", "Graphic designer"],
    rating: 3.9,
    availability: "Full-time",
  },
  {
    id: 2,
    name: "Michell",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["React", "Graphic designer"],
    rating: 2.5,
    availability: "Part-time",
  },
  {
    id: 3,
    name: "Joe Wills",
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["React", "Graphic designer"],
    rating: 4.0,
    availability: "Freelance",
  },
  // Add more mock data to demonstrate pagination
  {
    id: 4,
    name: "Sarah Johnson",
    skillsOffered: ["UI Design", "Figma"],
    skillsWanted: ["JavaScript", "React"],
    rating: 4.2,
    availability: "Full-time",
  },
  {
    id: 5,
    name: "David Chen",
    skillsOffered: ["Node.js", "MongoDB"],
    skillsWanted: ["AWS", "DevOps"],
    rating: 3.7,
    availability: "Freelance",
  },
  {
    id: 6,
    name: "Emma Wilson",
    skillsOffered: ["React", "TypeScript"],
    skillsWanted: ["UI Design", "UX Research"],
    rating: 4.5,
    availability: "Part-time",
  },
  {
    id: 7,
    name: "Michael Brown",
    skillsOffered: ["Python", "Data Science"],
    skillsWanted: ["Machine Learning", "TensorFlow"],
    rating: 4.8,
    availability: "Full-time",
  },
];

export default function Home() {
  // State for search and filtering
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredProfessionals, setFilteredProfessionals] =
    useState<Professional[]>(PROFESSIONALS);
  const professionalsPerPage = 3;

  // Filter professionals based on search query and availability
  useEffect(() => {
    let results = PROFESSIONALS;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter((professional) => {
        // Search in name
        if (professional.name.toLowerCase().includes(query)) return true;

        // Search in skills offered
        if (
          professional.skillsOffered.some((skill) =>
            skill.toLowerCase().includes(query)
          )
        )
          return true;

        // Search in skills wanted
        if (
          professional.skillsWanted.some((skill) =>
            skill.toLowerCase().includes(query)
          )
        )
          return true;

        return false;
      });
    }

    // Apply availability filter
    if (availabilityFilter && availabilityFilter !== "Availability") {
      results = results.filter(
        (professional) => professional.availability === availabilityFilter
      );
    }

    setFilteredProfessionals(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, availabilityFilter]);

  // Calculate pagination
  const indexOfLastProfessional = currentPage * professionalsPerPage;
  const indexOfFirstProfessional =
    indexOfLastProfessional - professionalsPerPage;
  const currentProfessionals = filteredProfessionals.slice(
    indexOfFirstProfessional,
    indexOfLastProfessional
  );
  const totalPages = Math.ceil(
    filteredProfessionals.length / professionalsPerPage
  );

  // Handle search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle availability filter change
  const handleAvailabilityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAvailabilityFilter(e.target.value);
  };

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle request button click
  const handleRequestClick = (professionalId: number) => {
    alert(`Request sent to professional #${professionalId}`);
    // In a real app, this would send a request to the backend
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Space for navbar */}
      <div className="h-16"></div>

      {/* Hero section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[var(--color-text)]">
          Find Skilled Professionals
        </h1>

        {/* Search and filter section */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg p-4 shadow-md">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="absolute right-2 top-2 bg-[var(--color-main)] text-white px-4 py-1 rounded-md"
              onClick={() => setSearchQuery(searchQuery)} // Re-apply current search
            >
              search
            </button>
          </div>
          <div className="relative ml-4">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]"
              value={availabilityFilter}
              onChange={handleAvailabilityChange}
            >
              <option>Availability</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Freelance</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Professionals listing */}
        <div className="space-y-6">
          {currentProfessionals.length > 0 ? (
            currentProfessionals.map((professional) => (
              <div
                key={professional.id}
                className="bg-white rounded-lg p-6 shadow-md flex items-center justify-between border-l-4 border-[var(--color-main)]"
              >
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-6">
                    Profile Photo
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {professional.name}
                    </h2>
                    <div className="mt-2">
                      <p className="text-sm text-green-600 mb-1">
                        Skills Offered:
                      </p>
                      <div className="flex space-x-2">
                        {professional.skillsOffered.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-[var(--color-main)] text-white text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-blue-600 mt-2 mb-1">
                        Skill wanted:
                      </p>
                      <div className="flex space-x-2">
                        {professional.skillsWanted.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-[var(--color-highlight)] text-white text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    className="bg-[var(--color-main)] hover:bg-teal-600 text-white px-4 py-2 rounded-md mb-2"
                    onClick={() => handleRequestClick(professional.id)}
                  >
                    Request
                  </button>
                  <div className="text-sm">
                    <span className="font-semibold">rating</span>{" "}
                    {professional.rating}/5
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-600">
                No professionals found matching your criteria.
              </p>
              <button
                className="mt-4 bg-[var(--color-main)] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setSearchQuery("");
                  setAvailabilityFilter("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProfessionals.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                      pageNumber === currentPage
                        ? "text-[var(--color-main)]"
                        : "text-gray-700"
                    } hover:bg-gray-50`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
