import s from "./infoModal.module.css"

const InfoModal = ({data, close}) => {
    return(
        <div className={s.wrapInfo}>
            <button onClick={close}>❌</button>
            <div>
                <img src={data.image} alt={data.name} />
                <h2> <strong>Name: </strong>{data.name}</h2>
                <p> <strong>Status: </strong> {data.status}</p>
                <p> <strong>Origin: </strong> {data.origin.name}</p>
                <p> <strong>Species: </strong> {data.species}</p>
                <p> <strong>Gender: </strong> {data.gender}</p>
                <p> <strong>Location: </strong> {data.location.name}</p>
                <p> <strong>Created: </strong> {new Date(data.created).toLocaleTimeString("pt-BR",{
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                })}</p>
            </div>
        </div>
    )
}

export default InfoModal