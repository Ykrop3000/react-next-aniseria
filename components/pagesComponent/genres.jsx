import Genre from './genre'

const Genres = ({genres}) => { 
    return (
        <div className="genres">
        {
            genres.map((genre,id) => (
                <Genre key={id} genre={genre}/>
            ))
        }
        </div>
    )
}
export default Genres