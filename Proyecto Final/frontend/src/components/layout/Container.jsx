function Container({ children }) {
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial' }}>
      {children}
    </div>
  );
}

export default Container;