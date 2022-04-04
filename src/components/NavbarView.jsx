import { useNavigate, Link } from "react-router-dom";

export default function NavbarView(props) {
  const navigate = useNavigate();
  return (
<div className="navbar bg-base-100">
<div className="navbar-start">
  <div className="dropdown">
    <label tabIndex="0" className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
    </label>
    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li onClick={() => navigate("/")}><a>HOME</a></li>
      <li onClick={() => navigate("discover")}><a>DISCOVER</a></li>
      <li onClick={() => navigate("create_project")}><a>CREATE A PROPOSAL</a></li>
    </ul>
  </div>
</div>
<div className="navbar-center">
  <a className="btn btn-ghost normal-case text-xl">TELOS.BUILD</a>
</div>
<div className="navbar-end">
  {/* <button className="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  </button> */}
  <button className="btn btn-ghost">
  <Link to="/profile" state={{ address: props.address }}>
            {props.address.slice(0,5) + "..." + props.address.slice(props.address.length - 4, props.address.length)}
          </Link>
  </button>
</div>
</div>
  );
}
