import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Helmet} from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleCharacterPage.scss';


const SingleCharacterPage = () => {
    const {character} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacterByName, error, loading, clearError} = useMarvelService();

    useEffect(() => {
        clearError();
        getCharacterByName(character).then(char => {
            setChar(char);
        })
    }, [])

    const errorMessage = (error || !char) && !loading  ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
    

}

const View = ({char}) => {
    return (
        <div className="single-page__wrapper">
            <Helmet>
                <meta
                    name="description"
                    content={`${char.name} page`}
                    />
                <title>{char.name}</title>
            </Helmet>
            <img src={char.thumbnail} alt={char.name} />
            <div className="single-page__text">
                <div className="single-page__title">{char.name}</div>
                <div className="single-page__descr">{char.description}</div>
            </div>
        </div>
    )
}

export default SingleCharacterPage;