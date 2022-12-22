import React from 'react';
import { useState } from 'react'
function App() {
    const [movieName, setName] = useState("");
    const [reviews, setEmail] = useState("");
    const [genre, setGenre] = useState("");
    const handleOnSubmit = async (e) => {
        alert("Sending "+JSON.stringify({ movieName, reviews, genre }));
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5001/register', {
            method: "post",
            body: JSON.stringify({ movieName, reviews, genre }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved successfully");
            setEmail("");
            setName("");
            setGenre("");
        }
    }
    return (
        <>
            <h1>This is a React WebApp </h1>
            <form action="">
                <input type="text" placeholder="movieName" 
                value={movieName} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="reviews" 
                value={reviews} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="genre" 
                value={genre} onChange={(e) => setGenre(e.target.value)} />
                <button type="submit" 
                onClick={handleOnSubmit}>submit</button>
            </form>

        </>
    );
}

export default App;