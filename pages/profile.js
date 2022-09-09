import React from "react";
import Image from "next/image";
import Link from "next/link";
import profileStyle from "../styles/Profile.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { FiAward, FiBookmark, FiUser } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import axios from "axios";
import { ProfileContext } from "../contex";

axios;
function Profile() {
  const [user, setUser] = React.useState([]);
  const UserConsumer = React.useContext(ProfileContext);

  React.useEffect(() => {
    localStorage;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/userdata/findbyID/?id=${UserConsumer.id}`
      )
      .then((res) => {
        setUser(res?.data?.user);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, [user]);

  return (
    <>
      <div className={profileStyle.profileUpper}>
        <div className="container-fluid ">
          <div className="justify-content-center ">
            {/* navbar */}
            <div>
              <nav className="navbar fixed-bottom bg-light">
                <div className={`${profileStyle.navbar} container-fluid `}>
                  <Link href="/" passHref>
                    <a>
                      <Image
                        src="/images/homebutton.png"
                        alt="user"
                        width="97px"
                        height="52px"
                      />
                    </a>
                  </Link>
                  <Link href="/addRecipe" passHref>
                    <a>
                      <Image
                        src="/images/addbutton.png"
                        alt="user"
                        width="24px"
                        height="24px"
                      />
                    </a>
                  </Link>
                  <Link href="/massage" passHref>
                    <a>
                      <Image
                        src="/images/messagebutton.png"
                        alt="user"
                        width="24px"
                        height="24px"
                      />
                    </a>
                  </Link>
                  <Link href="/profile" passHref>
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
            {/* profile upper */}
            <div className="d-flex justify-content-center align-items-center">
              {user?.map((item, index) => (
                <div className="col-4 text-center" key={index}>
                  <div className={`${profileStyle.card} card mb-3 `}>
                    <img
                      src={item?.photo_profile}
                      className="card-img-bottom"
                      alt="photo profile"
                      width="120px"
                      height="120px"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <h3>{item?.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* profile lower */}
      <div className={profileStyle.profileLower}>
        <div className={`${profileStyle.container} container-fluid`}>
          <div className={`${profileStyle.cardMenu} card`}>
            <div className="mt-3">
              <div className={profileStyle.editMenu}>
                <span>
                  <FiUser />
                </span>
                <h6 className="d-flex align-items-center"> Edit User</h6>
                <div>
                  <Link href="/editProfile" passHref>
                    <a>
                      <MdArrowForwardIos />
                    </a>
                  </Link>
                </div>
              </div>
              <div className={profileStyle.editMenu}>
                <span>
                  <FiAward />
                </span>
                <h6 className="d-flex align-items-center">My Recipe</h6>
                <div>
                  <Link href="/myRecipe" passHref>
                    <a>
                      <MdArrowForwardIos />
                    </a>
                  </Link>
                </div>
              </div>
              <div className={profileStyle.editMenu}>
                <span>
                  <FiBookmark />
                </span>
                <h6 className="d-flex align-items-center">Saved User</h6>
                <div>
                  <Link href="/savedRecipe" passHref>
                    <a>
                      <MdArrowForwardIos />
                    </a>
                  </Link>
                </div>
              </div>
              <div className={profileStyle.editMenu}>
                <span>
                  <BiLike />
                </span>
                <h6 className="d-flex align-items-center">Liked User</h6>
                <div>
                  <Link href="/likedRecipe" passHref>
                    <a>
                      <MdArrowForwardIos />
                    </a>
                  </Link>
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
