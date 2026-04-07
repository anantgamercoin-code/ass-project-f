import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../../styles/layout/layout.css";

function Layout({ children, setPage, activePage, setIsAuthenticated }) {
  return (
    <div className="layout">
      <Sidebar setPage={setPage} activePage={activePage} />

      <div className="layout__main">
        <Topbar setIsAuthenticated={setIsAuthenticated} />

        <main className="layout__content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;