import searchStyle from "../../styles/Search.module.css";
import Image from "next/image";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

function Search() {
  const [listSearch, setListSearch] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = React.useState(null);
  const [filter, setFilter] = useState("DESC");
  const router = useRouter();
  const { query } = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };

  function handleAddrTypeChange(e) {
    setFilter(e.target.value);
  }

  React.useEffect(() => {
    if (search !== null) {
      router.push(`/search/${search}`);
    }
  });

  React.useEffect(() => {
    if (query?.name) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}/recipe/find?title_recipe=${query.name}&filter=${filter}`
        )
        .then((res) => {
          setIsError(false);
          setListSearch(res.data.recipe);
        })
        .catch((error) => {
          setIsError(true);
          setErrorMsg(error?.response?.data);
        });
    }
  }, [listSearch, query]);
  return (
    <>
      <div className="container mt-4">
        <div className={searchStyle.title}>
          <div
            className="d-flex align-content-center mb-4"
            style={{ justifyContent: "space-between" }}
          >
            <Link href="/" passHref>
              <a>
                <button type="button" className="btn btn-light">
                  <Image
                    src="/images/backbutton.png"
                    alt="back"
                    width="48px"
                    height="48px"
                  />
                </button>
              </a>
            </Link>
            <div className="d-flex align-items-center ">
              <form className="input-group mb-3 " onSubmit={handleSearch}>
                <span
                  className={`${searchStyle.icon} input-group-text bg-light`}
                  id="basic-addon1"
                >
                  <FiSearch />
                </span>
                <input
                  type="text"
                  className={`${searchStyle.form} form-control form-control-lg bg-light `}
                  placeholder="Search Recipe"
                  required
                />
              </form>
            </div>
            <div></div>
          </div>
          <div className="d-flex justify-content-start mb-2">
            <span>
              <h5>Sort By:</h5>
            </span>
            <select
              defaultValue={filter}
              onChange={handleAddrTypeChange}
              className="Default select example "
              style={{ borderRadius: "10px", marginLeft: "5px" }}
            >
              <option selected value="DESC">
                Newest
              </option>
              <option value="ASC">Latest</option>
            </select>
          </div>
          {isError ? (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          ) : null}
          {listSearch.map((item, key) => (
            <div key={key}>
              <Link
                href={`/detailRecipe/${encodeURIComponent(item.id)}`}
                passHref
              >
                <div
                  className="card"
                  style={{
                    borderRadius: "15px",
                    padding: "10px",
                    border: "none",
                    boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  key={key}
                >
                  <div className="row">
                    <div className="col-2">
                      <div className={searchStyle.popularRecipe}>
                        <Image
                          src={item?.image}
                          width="80px"
                          height="80px"
                          objectFit="cover"
                          style={{
                            borderRadius: "15px",
                          }}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="col-7 d-flex align-items-center">
                      <div style={{ marginLeft: "50px" }}>
                        <h6>{item?.title_recipe}</h6>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
