import logo from "./logo.svg";
import "./App.css";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 34,
  },
  pos: {
    marginBottom: 12,
  },
});
function App() {
  const [search, setSearch] = useState("Delhi");
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=63d6d88996e578187824190c05551ea7`;
      const response = await fetch(url);
      const data = await response.json();
      setCity(data.main);
    }
    fetchdata();
  }, [search]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const classes = useStyles();

  return (
    <div className="App">
      <div className="card">
        <TextField
          id="outlined-basic"
          type="search"
          variant="outlined"
          value={search}
          onChange={handleChange}
        />
        {!city ? (
          <p>City not found</p>
        ) : (
          <div>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {search}
            </Typography>

            <Typography variant="h5" component="h2">
              Temperature
            </Typography>
            <Typography variant="h6" component="p">
              {city.temp}°C
            </Typography>

            <Typography variant="h5" component="h2">
              Humidity
            </Typography>
            <Typography variant="h6" component="p">
              {city.humidity}
            </Typography>

            {/* {dta && <div>{dta.name.first}</div>} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
