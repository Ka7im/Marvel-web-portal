import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {useState} from 'react';
import * as yup from "yup"
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charForm.scss';

const schema = yup.object({
    char: yup.string().required('This field is required'),
})


const CharForm = () => {

    console.log('renderForm')

    const { register, formState: { errors }, handleSubmit, reset } = useForm({mode:'onBlur', resolver: yupResolver(schema)});
    const {loading, error, getCharacterByName} = useMarvelService();
    const [char, setChar] = useState(false);
    

    function updateChar(name) {
        getCharacterByName(name).then(char => {
            setChar(char);
        })
    }

    const onSubmit = ({char}) => {
        updateChar(char);
        reset();
    };

    let message = null;

    if (char) {
        message = <Link to={`/${char.name}`}>
                        <div className="char-form__wrapper">
                            <div className='char-form__success'>There is! Visit {char.name} page?</div>
                            <button className='button button__secondary'><div className="inner">page</div></button>
                        </div>
                  </Link>;
    } else if (char === false) {
        message = null;
    } else if (char === null) {
        message = <div className='char-form__warning'>
            The character was not found. Check the name and try again
        </div>}; 

    const spinner = loading && !error ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !loading && !error ? <View register={register} 
                                            errors={errors} 
                                            message={message} /> : null;


    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="char-form">
            {spinner}
            {errorMessage}
            {view}
        </form>
        </>
    )
}



function View({register, errors, message}) {
    return (
        <>
            <label htmlFor="char" className='char-form__label'>Or find a character by name:</label>
            <div className="char-form__wrapper">
                <input type="text" {...register('char', {required: true})} placeholder="Enter name"/>
                <button type='submit' className='button button__main'><div className="inner">find</div></button>
            </div>
            {errors.char ? <div className='char-form__warning'>{errors.char.message}</div> : message }
        </>
    )
}

export default CharForm;