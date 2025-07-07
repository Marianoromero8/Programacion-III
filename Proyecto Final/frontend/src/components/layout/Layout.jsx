import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>{children}</main>
    </>
  );
}

export default Layout;
