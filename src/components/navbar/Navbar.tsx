import "./navbar.scss"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="" alt="" />
        <span>SUMMAI</span>
      </div>

      <div className="icons">
        <img src="/settings.svg" alt="" className="icon" />
        
        <div className="user">
          <img src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
          <span>User</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar