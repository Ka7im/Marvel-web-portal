import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Helmet} from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './singleCharacterPage.scss';

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error': 
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state');
    } 
}


const SingleCharacterPage = () => {
    const {character} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacterByName, process, setProcess} = useMarvelService();

    useEffect(() => {
        getCharacterByName(character)
            .then(char => {
                char ? setProcess('confirmed') : setProcess('error');
                setChar(char);
            });
    }, [])

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
    

}

const View = ({data}) => {
    return (
        <div className="single-page__wrapper">
            <Helmet>
                <meta
                    name="description"
                    content={`${data.name} page`}
                    />
                <title>{data.name}</title>
            </Helmet>
            <img src={data.thumbnail} alt={data.name} />
            <div className="single-page__text">
                <div className="single-page__title">{data.name}</div>
                <div className="single-page__descr">{data.description}</div>
            </div>
        </div>
    )
}

export default SingleCharacterPage;