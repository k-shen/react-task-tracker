import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, btnOption }) => {
    const loc = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            {loc.pathname === '/' ? (!btnOption? 
                <Button  
                    color='green' 
                    text='Add' 
                    onClick={onAdd} /> :
                <Button  
                    color='orange' 
                    text='Close' 
                    onClick={onAdd} />) : <></>}
        </header>
    )
}



Header.defaultProps = {
    title:"Task Tracker"
}

Header.propTypes = {
    title: PropTypes.string.isRequired, 
}

//CSS in JS
/*
const headingStyle = {
    color: 'blue', 
    backgroundColor:'lightblue'
}
*/

export default Header
