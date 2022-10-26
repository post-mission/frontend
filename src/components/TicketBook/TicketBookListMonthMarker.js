
const TicketBookListMonthMarker = ({ monthKey }) => {
    return (
        <>
            <div className="col col1 month-sep">
                <svg
                    className="month-marker"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -0.5 10 50"
                    shapeRendering="crispEdges"
                >
                    <path
                    stroke="#1b5e20"
                    d="M4 0h2M4 1h2M4 2h2M4 3h2M4 4h2M4 5h2M4 6h2M4 7h2M4 8h2M4 9h2M4 10h2M4 11h2M4 12h2M4 13h2M4 14h2M4 15h2M4 16h2M4 17h2M4 18h2M4 19h2M4 20h2M4 21h2M2 22h6M2 23h6M2 24h6M2 25h6M2 26h6M2 27h6M4 28h2M4 29h2M4 30h2M4 31h2M4 32h2M4 33h2M4 34h2M4 35h2M4 36h2M4 37h2M4 38h2M4 39h2M4 40h2M4 41h2M4 42h2M4 43h2M4 44h2M4 45h2M4 46h2M4 47h2M4 48h2M4 49h2"
                    />
                </svg>
            </div>
            <div className="col col2 month-sep-name">
                <h3>{monthKey.replace("-", ".")}</h3>
            </div>
        </>
    )
}

export default TicketBookListMonthMarker;