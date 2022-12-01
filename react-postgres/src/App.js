import React, {useState, useEffect} from 'react';
function App() {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    getMerchant();
  }, []);

  function getMerchant() {
    fetch('http://localhost:8000')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setMerchants(data);
      });
  }

  function createMerchant() {
    let name = prompt('Enter client name');
    let email = prompt('Enter client email');
    let job = prompt('Enter client job');
    let age = prompt('Enter client age');
    fetch('http://localhost:8000/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, job, age}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }

  function deleteMerchant() {
    let id = prompt('Enter client id');
    fetch(`http://localhost:8000/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }
  return (
    <div>
      {merchants ? merchants : 'There is no client data available'}
      <br />
      <br />
      <button onClick={createMerchant} style={{ backgroundColor: 'green', width: '100px', height: '50px', borderRadius: '20%', border: '1px solid blue' }}>Add Client</button>
      <br />
      <br />
      <button onClick={deleteMerchant} style={{ backgroundColor: 'red', width: '100px', height: '50px', borderRadius: '20%', border: '1px solid blue' }}>Delete Client</button>
    </div>
  );
}
export default App;