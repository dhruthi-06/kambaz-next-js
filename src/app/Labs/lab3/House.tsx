export default function House () {
    const house = {
        bedroom : 4, bathroom : 2.5,
        sqft : 2500,
        address: {
            street : "Via Roma", city : "Roma", state :"Roma", zip : "0100", Country : "Italy"
        },
        owners : ["alice","bob"]
    };
    console.log(House);
    return (
        <div id="wd-house">
            <h3>House</h3> 
            <h5>Bedroom</h5> {house.bedroom}
            <h5>Bathroom</h5> {house.bathroom}
            <h5>Data</h5>
            <pre>
                {JSON.stringify(house,null,2)}<hr/>
            </pre>
        </div>
    );
}