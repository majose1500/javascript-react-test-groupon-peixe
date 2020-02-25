import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { MoviesShowcase } from "../../widgets";
import * as actions from "../../redux/popularMovies/action";

const Home = () => {
    // Props from redux
    const { list, isFetching } = useSelector(
        state => ({
            list: state.popularMovies.list,
            isFetching: state.popularMovies.isFetching
        }),
        shallowEqual
    );
    
    // Redux dispatch
    const dispatch = useDispatch();
    
    // Life Cycle
    useEffect(() => {
        dispatch(actions.fetchPopularMovieList());
    }, []);

    // Functions
    const saveMovieSelected = movieId => {
        dispatch(actions.updateHouseSelected(movieId));
    };

    return (
        <Container className="mt-4 fluid">
            {!isFetching ? (
                <MoviesShowcase
                    title="Popular Movies"
                    movies={list}
                    onMovieClick={saveMovieSelected}
                />
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default Home;
