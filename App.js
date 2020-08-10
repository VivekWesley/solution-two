const cafesList = document.getElementById('cafesList');
const searchBar = document.getElementById('searchBar');
var finalArray = []
var cafeArray = []
var placeArray = []
var result = []

searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    const searchString = e.target.value.toLowerCase();
    const filteredArray = finalArray.filter((result) =>{
        return (
            result.name.toLowerCase().includes(searchString)
        );
    });
    displayCafe(filteredArray)
});

var loadCafes = () => {
        const fetchPlace = fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json')
        const fetchCafe = fetch('https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json')     
        Promise.all([fetchPlace, fetchCafe])
            .then(values => {
                return Promise.all(values.map(r => r.json()));
            }).then(([places, cafes]) => {
                console.log(places);
                console.log(cafes);
                //console.log(cafes.length);
                if(places.length > 0){
                    places.forEach((place) => {
                        console.log(place.locality);
                    });
                }
                        
                for(let j=0; j<places.length; j++){
                    for(let i=0; i<cafes.length; i++){
                        if(places[j].id === cafes[i].location_id){
                            const finalcafe = Object.assign({}, places[j]);
                            finalcafe.name = cafes[i].name
                            finalArray.push(finalcafe);
                        }  
                    }   
                }
                displayCafe(finalArray)
                console.log('finalArray', finalArray);
            }).catch (err => { 
        console.error(err)
        });
    }

const displayCafe = (finalArray) => {
    const htmlString = finalArray
    .map((cafe) => {
        return `
        <tr>
            <td class="column1">${cafe.id}4</td>
            <td class="column2">${cafe.name}</td>
            <td class="column3">${cafe.street_no} ${cafe.locality}</td>
            <td class="column4">${cafe.postal_code}</td>
            <td class="column5">${cafe.lat}</td>
            <td class="column6">${cafe.long}</td>
        </tr> `
    })
    .join('');
    cafeList.innerHTML = htmlString;
};

loadCafes();
