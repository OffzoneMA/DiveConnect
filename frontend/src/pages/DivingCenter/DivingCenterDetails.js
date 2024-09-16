import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DivingCenterDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [divingCenter, setDivingCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the diving center details when the component mounts
  useEffect(() => {
    const fetchDivingCenterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/diving-centers/${id}`);
        setDivingCenter(response.data);
      } catch (err) {
        setError("Error fetching diving center details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDivingCenterDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="bg-gray-700 mt-8 sm:mt-4">
      <div className="container mx-auto px-3 sm:px-6 sm:py-20">
        <div className="flex gap-6">
          <div className="flex flex-col gap-10 flex-[1_1_0]">
            <div className="flex flex-col rounded-sm bg-[#E3EFFF]">

            {divingCenter ? (
          <div className="flex flex-col gap-10">
            <h1 className="text-3xl font-bold">{divingCenter.name}</h1>
            <p>{divingCenter.description}</p>
            <div>
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p>Email: {divingCenter.email}</p>
              <p>Phone: {divingCenter.phone}</p>
              <p>Address: {divingCenter.address}</p>
              {divingCenter.website && (
                <p>
                  Website: <a href={divingCenter.website} target="_blank" rel="noopener noreferrer">{divingCenter.website}</a>
                </p>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Social Media</h2>
              <ul>
                {divingCenter.socialMedia.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Languages</h2>
              <p>{divingCenter.languages.join(", ")}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Agencies</h2>
              <p>{divingCenter.agencies.join(", ")}</p>
            </div>
          </div>
        ) : (
          <p>No diving center data available.</p>
        )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivingCenterDetails;