import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  colors,
  Autocomplete,
  TextField,
} from "@mui/material";
import axios from "axios";
import { stocks } from "./_stocks";

interface stock_data {
  symbol: string;
  price: string;
  name: string;
  description: string;
}

function App() {
  const [stockData, setStockData] = useState<stock_data>();
  const [selectedStock, setSelectedStock] = useState<string>('AMZN');

  const getStock = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/stock/${selectedStock}`
      );
      const data = response.data;
      setStockData(data);
    } catch (error) {}
  };

  useEffect(() => {
    const init = async () => {
      await getStock();
    };
    init();
  }, [selectedStock]);

  // Update after every 1min
  useInterval(() => {
    getStock();
  }, 60000);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            p: 2,
            gap: 1,
            backgroundColor: colors.grey["100"],
          }}
        >
          <Typography variant="h3" sx={{ mt: 1 }}>
            Stock Price Tracker
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={stocks}
            getOptionLabel={(stock: any) => stock?.company}
            onChange={(event, newValue) => {
              // console.log(newValue,"newValue");
              setSelectedStock(newValue?.symbol);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select stock to view price." />
            )}
          />
        </Box>

        {stockData && (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mt: 2, color: "black", fontWeight: "bold" }}
            >
              {stockData?.name}
            </Typography>
            <Typography
              component="p"
              variant="subtitle1"
              sx={{ mt: 3, color: "grey" }}
            >
              {stockData?.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  mt: 2,
                  p: 3,
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h4" sx={{ color: "red" }}>
                  ₹ {stockData?.price}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default App;

// useInterval hook
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void | null>(null);

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
