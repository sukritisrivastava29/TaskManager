import { CheckSquare } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-content">

        <div className="logo-section">
          <div className="logo-circle">
            <CheckSquare size={28} />
          </div>

          <div>
            <h1>TaskFlow</h1>
            <p>Manage your work beautifully.</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;