import React from "react";
import Image from "next/image";
import Link from "next/link";
import profileStyle from "../styles/pages/profile.module.css";
function Profile() {
  return (
    <>
      <div className={profileStyle.profileUpper}>
        <div className="container-fluid ">
          <div className="row justify-content-center ">
            {/* navbar */}
            <div>
              <nav className="navbar fixed-bottom bg-light">
                <div className="container-fluid">
                  <Link href="/register" passHref>
                    <a>
                      <Image
                        src="/images/homebutton.png"
                        alt="user"
                        width="97px"
                        height="52px"
                      />
                    </a>
                  </Link>
                  <Link href="/register" passHref>
                    <a>
                      <Image
                        src="/images/addbutton.png"
                        alt="user"
                        width="24px"
                        height="24px"
                      />
                    </a>
                  </Link>
                  <Link href="/register" passHref>
                    <a>
                      <Image
                        src="/images/messagebutton.png"
                        alt="user"
                        width="24px"
                        height="24px"
                      />
                    </a>
                  </Link>
                  <Link href="/register" passHref>
                    <a>
                      <Image
                        src="/images/userbutton.png"
                        alt="user"
                        width="24px"
                        height="24px"
                      />
                    </a>
                  </Link>
                </div>
              </nav>
            </div>
            <div className="col-4 text-center">
              <div className="card mb-3">
                <Image
                  src="/images/vegetables.png"
                  className="card-img-bottom"
                  alt="test"
                  width="330px"
                  height="330px"
                />
              </div>
              <h3>NAME</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={profileStyle.profileLower}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className={profileStyle.card}>
              <div className="card">
                <div className="card-body">
                  <div className="card-text">
                    <div className="col-12 text-center">
                      <div className="col-6">
                        <p>test12</p>
                        <p>test12</p>
                      </div>
                    </div>
                    <div className="col-6">test</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
