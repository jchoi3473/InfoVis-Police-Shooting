import logo from './logo.svg';
import './App.css';
import GenderBar from './plots/GenderBar'
import datafile from './data/data.json'
import USMap from './plots/USMap'
import usData from './data/states-10m.json'
import RaceBar from './plots/RaceBar';
import AgeBar from './plots/AgeBar';
import { useEffect, useState } from 'react';
import YearSlider from './components/YearSlider';
import GenderCheckBox from './components/GenderCheckBox';
import RaceCheckBox from './components/RaceCheckBox';
import {ColorRing} from 'react-loader-spinner'
import LinkIcon from '@mui/icons-material/Link';

// import fs from 'fs';
// let data = datafile
function App() {
  const [isLoading, setLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState([2015,2022])
  const [data, setData] = useState();
  
  const [genderBox, setGenderBox] = useState({
    M: true,
    F: true,
  });
  const [raceBox, setRaceBox] = useState({
    Asian: true,
    White: true,
    Hispanic: true,
    Black: true,
    Others: true,
    Natives: true,
  });

  const [count, setCount] = useState(0);
  
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  
  async function itemLoding(){
    const countTimer = await setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    // every 1000 milliseconds
    }, 5000);
    // and clear this timer when the component is unmounted
    return function cleanup() {
      setCount(0);
    };
  }

  const handleGenderChange = (event) => {
    setLoading(true);
    setGenderBox({
      ...genderBox,
      [event.target.name]: event.target.checked,
    });
  };

  const handleRaceChange = (event) => {
    setLoading(true);
    setRaceBox({
      ...raceBox,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSliderChange = (event, newValue) =>{
    setLoading(true);
    setSliderValue(newValue);
  }

  useEffect(() =>{
    setData(datafile)
    itemLoding()
    setLoading(false)
  },[])

  useEffect(() =>{
    var tempData = []
    for(var i=0;i<datafile.length;i++){
      
      if(genderBox[datafile[i].gender]&&raceBox[datafile[i].race]
        && (datafile[i].year>=sliderValue[0] && datafile[i].year <= sliderValue[1])){
        tempData.push(datafile[i])
        // console.log(datafile[i])
        // concat(datafile[i])
      }
    }
    // console.log(raceBox);
    // console.log(sliderValue);
    // console.log(genderBox);

    // console.log(tempData)
    setData(tempData)
    itemLoding()
    setLoading(false);
  },[sliderValue, genderBox, raceBox])


  return (
    <div className="App">
      {isLoading?<div className='Loading'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
      :
      <div>
      <div className='Title'>
      Visualizing Police Shootings
      </div>
      <div className='DatasetContainer'>
      <div style={{fontSize:"20px", marginRight:"5px"}}>
        {"Original Dataset "} 
        </div>
        <LinkIcon fontSize ={"large"} style={{cursor:"pointer"}} onClick={() => window.open("https://www.kaggle.com/datasets/ramjasmaurya/us-police-shootings-from-20152022")}/>
        </div>
             {/* <LineChart Data={data2} /> */}
             <div className='Container'>
              <div className='BarChart-Container'>
                <GenderBar Data = {data}/>
                <RaceBar Data = {data}/>
                <AgeBar Data = {data}/>
              </div>
              <div className='Map-Container'>
                <USMap data = {data} us = {usData}/>
                <div className="toolbar">
                  <div style={{paddingTop:"10px", fontWeight:"bold", marginBottom:"10px", fontSize:"20px"}}>Category Filter</div>
                  <div>
                  <div>Assign Year Range</div>
                  <YearSlider  value = {sliderValue} handleChange={handleSliderChange}/> 
                  <div className='Year-Slider'>
                    <div>2015</div>
                    <div>2022</div>
                  </div>
                  </div>
                  <GenderCheckBox gender = {genderBox} handleChange = {handleGenderChange}/>
                  <RaceCheckBox race = {raceBox} handleChange = {handleRaceChange}/>
                </div>
              </div>
             </div>
             {/* <HealthRegionList/> */}
        </div>
        }
    </div>

  );
}

export default App;
