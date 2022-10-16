import {useState, memo, useCallback} from 'react';
import {Helmet} from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharForm from '../charForm/CharForm';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";


import decoration from '../../resources/img/vision.png';

const MemoRandomChar = memo(RandomChar);
const MemoCharForm = memo(CharForm);

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = useCallback((id) => {
        setChar(id);
    }, [])

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <MemoRandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className='char__wrapper'>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <MemoCharForm/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;