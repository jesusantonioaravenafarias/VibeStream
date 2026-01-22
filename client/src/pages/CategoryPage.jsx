import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Row from '../components/Row';
import Footer from '../components/Footer';
import { useMovies } from '../hooks/useMovies';
import MovieModal from '../components/MovieModal';

const CategoryPage = ({ type }) => {
    const { t } = useTranslation();
    const isSeries = type === 'series';

    // Choose endpoints based on type
    const popularEndpoint = isSeries ? '/movies/series/popular' : '/movies/popular';
    const topRatedEndpoint = isSeries ? '/movies/series/top-rated' : '/movies/top-rated';
    const newEndpoint = isSeries ? '/movies/series/on-the-air' : '/movies/upcoming';

    // For Hero, we use the popular list
    const { movies: heroMovies } = useMovies(popularEndpoint);
    const featuredMovie = heroMovies[Math.floor(Math.random() * heroMovies.length)];
    const [selectedMovie, setSelectedMovie] = React.useState(null);

    return (
        <div className="category-page">
            <Navbar />
            <Hero movie={featuredMovie} onOpenInfo={() => setSelectedMovie(featuredMovie)} />

            <div className="rows-container" style={{ width: '100%', marginTop: '10px', position: 'relative', zIndex: '20' }}>
                <Row
                    title={isSeries ? t('series_popular') || "Series Populares" : t('row_popular')}
                    endpoint={popularEndpoint}
                    isLargeRow
                />
                <Row
                    title={isSeries ? t('series_top_rated') || "Mejor Valoradas" : t('row_top_rated')}
                    endpoint={topRatedEndpoint}
                />
                <Row
                    title={isSeries ? t('series_new') || "Nuevos Episodios" : t('row_upcoming')}
                    endpoint={newEndpoint}
                />
            </div>

            {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
            <Footer />
        </div>
    );
};

export default CategoryPage;
