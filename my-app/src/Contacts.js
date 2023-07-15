import React, { useState, useEffect } from 'react';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.log(error));
    }, []);

    const deleteContact = id => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    };

    const addContact = () => {
        const newContact = {
            id: contacts.length + 1,
            name,
            surname,
            phone
        };
        setContacts(prevContacts => [...prevContacts, newContact]);
        setShowForm(false);
        setName('');
        setSurname('');
        setPhone('');
    };

    return (
        <div>
            <h1>Список контактів</h1>
            <table>
                <thead>
                <tr>
                    <th style={{ textAlign: "start" }}>Ім'я</th>
                    <th style={{ textAlign: "start" }}>Прізвище</th>
                    <th style={{ textAlign: "start" }}>Телефон</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.username}</td>
                        <td>{contact.phone}</td>
                        <td>
                            <button onClick={() => deleteContact(contact.id)}>Видалити</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showForm ? (
                <div>
                    <h2>Форма контакту</h2>
                    <form onSubmit={e => e.preventDefault()}>
                        <label>
                            <text style={{ marginRight: 10 }}>Ім'я:</text>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} />
                        </label>
                        <br/><br/>
                        <label>
                            <text style={{ marginRight: 10 }}>Прізвище:</text>
                            <input type="text" value={surname} onChange={e => setSurname(e.target.value)} />
                        </label>
                        <br/><br/>
                        <label>
                            <text style={{ marginRight: 10 }}>Телефон:</text>
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                        </label>
                        <br/><br/>
                        <button style={{ marginRight: 10 }} onClick={addContact}>Зберегти</button>
                        <button onClick={() => setShowForm(false)}>Скасувати</button>
                    </form>
                </div>
            ) : (
                <div><br/>
                <button onClick={() => setShowForm(true)}>Додати контакт</button>
                </div>
            )}
        </div>
    );
};

export default Contacts;