import Link from "next/link";
import React from "react";
import homeStyle from "../styles/pages/home.module.css";
import Image from "next/image";

function Home() {
  return (
    <>
      <div className={homeStyle.home}>
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
            {/* search box */}
            <div className="col-11 mt-5 ">
              <input
                type="text"
                className="form-control mb-5 form-control-lg bg-light"
                id="exampleFormControlInput2"
                placeholder="Search Pasta, Bread, etc"
              ></input>
              <h3 className="mb-4">New Recipes</h3>
              <div className="col-5">
                <div className="card mb-5">
                  <Image
                    src="/images/vegetables.png"
                    className="card-img-bottom"
                    alt="test"
                    width="330px"
                    height="330px"
                  />
                  <div className="card-body text-warning ">
                    <p className="card-text">title</p>
                  </div>
                </div>
              </div>
              <h3 className="mb-4">Popular Recipes</h3>
              <div className="row">
                <div className="col-3">
                  <div className="card mb-3">
                    <Image
                      src="/images/vegetables.png"
                      className="card-img-bottom"
                      alt="test"
                      width="64px"
                      height="64px"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-body" height="64px">
                      <h4>Title</h4>
                      <p>Descripsi</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="card mb-3">
                    <Image
                      src="/images/vegetables.png"
                      className="card-img-bottom"
                      alt="test"
                      width="64px"
                      height="64px"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-body" height="64px">
                      <h4>Title</h4>
                      <p>Descripsi</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <div className="card mb-3">
                    <Image
                      src="/images/vegetables.png"
                      className="card-img-bottom"
                      alt="test"
                      width="64px"
                      height="64px"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-body" height="64px">
                      <h4>Title</h4>
                      <p>Descripsi</p>
                    </div>
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

export default Home;
