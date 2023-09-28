"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { logOut } from "@/firebase/firebase";
import { Button, Container, Navbar, Dropdown } from "react-bootstrap";
import "./common-component-style.css";
import { User } from "firebase/auth";

export const HeaderNavbar = () => {

  const [toggleProfile, setToggleProfile] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");

  const { user, setLoading } = useAuth();

  useEffect(() => {
    let profileSrc = user?.photoURL;
    setProfileImage((profileSrc && profileSrc != null && profileSrc.length > 0) ? profileSrc : "/profile-icon.png");
  }, [user]);

  const handleLogout = () => {
    setLoading(true);
    logOut().then(() => {
      setLoading(false);
    });
  }

  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src="/brand.png"
            width={150}
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        <div id="rightNav">
          <div id="nav-profile">
            <img src={profileImage} onClick={() => { setToggleProfile(!toggleProfile) }} />
            {toggleProfile && <ProfileDropdownContent onClickMethod={handleLogout} user={user} />}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

function ProfileDropdownContent(props: { onClickMethod: () => void; user: User | null; }) {
  return (
    <div className="dropdown-box" >
      <div className="">
        <p> <b>Email: </b> {props.user?.email} </p>
      </div>
      <Button variant="brand" className="w-100 mt-2 mb-2" onClick={props.onClickMethod} >
        Logout
      </Button>
    </div>
  );
}