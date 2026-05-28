import { useEffect, useState } from "react";
import Header from "./Header";
import API from "../api";
import "../styles/Profile.css";

function Profile() {

  const [candidate, setCandidate] = useState(null)

  const storedCandidate =
    JSON.parse(localStorage.getItem("Candidate"))

  const email = storedCandidate?.email

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response = await API.get(
          `/auth/profile/${email}`
        )

        setCandidate(response.data)

      } catch (error) {

        console.log(error)
      }
    }

    if (email) {
      fetchProfile()
    }

  }, [email])

  if (!candidate) {

    return <h2>Loading...</h2>
  }

  return (

    <div>

      <Header />

      <div className="profile-page">

        <div className="profile-card">

          <div className="big-profile">

            {candidate.name?.charAt(0).toUpperCase()}

          </div>

          <h3>{candidate.name}</h3>

          <div className="profile-info">

            <p>
              <span>Email:</span>
              {candidate.email}
            </p>

            <p>
              <span>Phone:</span>
              {candidate.phone}
            </p>

            <p>
              <span>Address Line 1:</span>
              {candidate.addressLine1}
            </p>

            <p>
              <span>Address Line 2:</span>
              {candidate.addressLine2}
            </p>

            <p>
              <span>City:</span>
              {candidate.city}
            </p>

            <p>
              <span>Pincode:</span>
              {candidate.pincode}
            </p>

            <p>
              <span>ID:</span>
              {candidate._id}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Profile