import React, { useEffect, useState } from 'react';

const getUser = Promise.resolve({ id: 1, name: 'Ulya' });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input placeholder="search text ..." id="search" type="text" value={value} onChange={onChange} required />
  </div>
);

const SearchPage = () => {
  const [ search, setSearch ] = useState('');
  const [ user, setUser ] = useState('');

  useEffect(() => {
    const loudUser = async () => {
      const user = await getUser;
      setUser(user);
    };
    loudUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <h2>Page For Search</h2>
      {user && <h3>logged in as {user.name} </h3>}
      <img className="image" src="" alt="search img"/>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : '...'}</p>
    </div>
  );
};

export default SearchPage;
