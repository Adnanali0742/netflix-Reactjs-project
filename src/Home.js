import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button} from 'reactstrap';
const Home = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:5000/';
            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
        <Fragment>
            <header>
                <h1>EPIFLIX</h1>
            </header>
            <div>
        <AppNavbar/>
      </div>
            {/* <div className="form-container">
                <h2>Add Movie</h2>
                <form method="POST" action="http://127.0.0.1:5000/add-movie">
                    <div>
                        <label>Movie Name</label>
                        <input type="text" name="movieName" required />
                    </div>
                    <div>
                        <label>Box Image</label>
                        <input type="text" name="imgUrl" required />
                    </div>
                    <div>
                        <label>Realease Year</label>
                        <input type="text" name="releaseYear" required />
                    </div>
                    <div>
                        <label>Summary</label>
                        <textarea rows="5" cols="50" name="summary"></textarea>
                    </div>
                    <div>
                        <label>Director</label>
                        <input type="text" name="director" required />
                    </div>
                    <div>
                        <label>Genre</label>
                        <input type="text" name="genre" required />
                    </div>
                    <div>
                        <label>Rating</label>
                        <input type="text" name="rating" required />
                    </div>
                    <div>
                        <label>Runtime</label>
                        <input type="text" name="movieRuntime" required />
                    </div>
                    <div>
                        <label>Meta Score</label>
                        <input type="text" name="metaScore" required />
                    </div>
                    <div>
                        <button type="submit">Add Movie</button>
                    </div>
                </form>
            </div> */}
            <main>
                {loading === true ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <section>
                        {apiData.map((movie) => {
                            let metaColor = 'low';
                            if (movie.id >= 5) {
                                metaColor = 'high';
                            } else if (movie.id <= 10 && movie.id >= 20) {
                                metaColor = 'medium';
                            } else {
                                metaColor = 'low';
                            }
                            return (
                                <div className="movie-container" key={String(movie.id)}>
                                    <h1>{movie.title}</h1>
                                    <p>
                                    <p>
                                        <strong>Date Added:</strong> {movie.release_date}
                                    </p>
                                        <strong>Popularity</strong> <span className={metaColor}>{movie.meta_score}</span>
                                    </p>

                                    <p>
                                        <strong>Rating:</strong> {movie.rating}
                                    </p>
                                    <p>{movie.summary}</p>
                                    <div className = "yolo">
                                        <Button color="link"><Link to="/details"><p><strong>Let's Watch</strong></p></Link></Button></div>
                                    
                                </div>
                            );
                        })}
                    </section>
                )}
            </main>
        </Fragment>
    );
};
export default Home;