import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const allowedAgencies = [
  "padi", "cmas", "ssi", "naui", "bsac", "sdii", "iadrs", "gue",
  "nasi", "aida", "pdic", "cedip", "raid", "and", "idt", "isa",
  "dive master", "iatd", "tdisdi", "scuba schools international",
  "global underwater explorers", "national association of underwater instructors",
  "international diving research and exploration organization",
  "fédération française d'études et de sports sous-marins"
];

const allowedLanguages = [
  "english", "french", "spanish", "german", "italian", "portuguese",
  "russian", "chinese", "japanese", "korean", "arabic", "hindi",
  "bengali", "urdu", "indonesian", "malay", "thai", "vietnamese",
  "dutch", "greek", "polish", "swedish", "norwegian", "finnish",
  "turkish", "hebrew", "hungarian", "czech", "slovak", "romanian",
  "bulgarian", "serbian", "croatian", "bosnian", "albanian", "georgian",
  "armenian", "azerbaijani", "farsi", "pashto", "tagalog", "filipino"
];

function DiveCenterRegister() {
  const { id } = useParams(); // Extract the ID from the URL
  const [diveCenter, setDiveCenter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
    phone: "",
    website: "",
    description: "",
    agencies: [],
    languages: [],
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: ""
    }
  });

  useEffect(() => {
    // Fetch dive center data from the API
    axios
      .get(`http://localhost:5050/diving-centers/${id}`)
      .then((response) => {
        const data = response.data;
        setDiveCenter(data);
        setFormData({
          ...formData,
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          address2: data.address2 || "",
          postalCode: data.postalCode || "",
          city: data.city || "",
          country: data.country || "",
          phone: data.phone || "",
          website: data.website || "",
          description: data.description || "",
          agencies: data.agencies || [],
          languages: data.languages || [],
          socialMedia: {
            facebook: data.socialMedia.facebook || "",
            instagram: data.socialMedia.instagram || "",
            twitter: data.socialMedia.twitter || "",
            youtube: data.socialMedia.youtube || "",
            linkedin: data.socialMedia.linkedin || ""
          }
        });
      })
      .catch((error) => console.error("Error fetching dive center data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialMedia: { ...formData.socialMedia, [name]: value }
    });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormData({ ...formData, [name]: selectedValues });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here (e.g., POST to an API)
    console.log("Form Data Submitted:", formData);
  };

  if (!diveCenter) return <div>Loading...</div>; // Show loading until the data is fetched

  return (
    <section className="bg-gray-700">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col justify-center items-center px-24 pt-24 pb-14">
          <h1 className="text-center text-[3.5rem] not-italic font-bold leading-[4.125rem] text-[#FBE080]">
            Dive Center Registration
          </h1>
        </div>
        <div className="flex px-24 h-auto gap-28">
          <form
            onSubmit={handleSubmit}
            className="flex w-[37.125rem] rounded-2xl flex-col justify-center items-start gap-4 px-[5.75rem] py-[4.2rem] bg-[#E3EFFF]"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Password"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
                placeholder="Address"
              />
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="input-field"
                placeholder="Address 2"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="input-field"
                placeholder="Postal Code"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field"
                placeholder="City"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input-field"
                placeholder="Country"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="Phone"
              />
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input-field"
                placeholder="Website"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                placeholder="Description"
              ></textarea>

              {/* Agencies */}
              <label>Agencies:</label>
              <select
                name="agencies"
                multiple
                value={formData.agencies}
                onChange={handleSelectChange}
                className="input-field"
              >
                {allowedAgencies.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>

              {/* Languages */}
              <label>Languages:</label>
              <select
                name="languages"
                multiple
                value={formData.languages}
                onChange={handleSelectChange}
                className="input-field"
              >
                {allowedLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              {/* Social Media */}
              <input
                type="text"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={handleSocialMediaChange}
                className="input-field"
                placeholder="Facebook URL"
              />
              <input
                type="text"
                name="instagram"
                value={formData.socialMedia.instagram}
                onChange={handleSocialMediaChange}
                className="input-field"
                placeholder="Instagram URL"
              />
              <input
                type="text"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={handleSocialMediaChange}
                className="input-field"
                placeholder="Twitter URL"
              />
              <input
                type="text"
                name="youtube"
                value={formData.socialMedia.youtube}
                onChange={handleSocialMediaChange}
                className="input-field"
                placeholder="YouTube URL"
              />
              <input
                type="text"
                name="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleSocialMediaChange}
                className="input-field"
                placeholder="LinkedIn URL"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="flex h-10 justify-center items-center gap-2 rounded-lg bg-[#4A3AFF] shrink-0 p-2.5 self-start"
              >
                <span className="font-bold text-white">Register Dive Center</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DiveCenterRegister;